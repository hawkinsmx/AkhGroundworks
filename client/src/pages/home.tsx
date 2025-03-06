import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { SERVICES, COMPANY_COLLABORATIONS } from "@/lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight, Award, Clock, Users, Banknote, Check } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true
  });

  // Auto-rotation setup
  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // Rotate every 3 seconds

      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Companies carousel for mobile
  const [companiesRef, companiesApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <img 
          src="/assets/spliced_26980x7400.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error(`Failed to load image: ${e.currentTarget.src}`);
            e.currentTarget.src = '/placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Professional Groundworks <br />& Civil Engineering
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-8 max-w-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Expert solutions for all your construction needs, delivered with precision and excellence.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/contact">
              <Button size="lg" className="text-lg">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Delivering excellence in groundworks and civil engineering through our comprehensive range of professional services.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {SERVICES.map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                      onClick={() => setLocation('/services')}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-gradient-to-br from-card to-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6 h-[250px] relative group cursor-pointer">
                        {/* Decorative accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 -mt-12 -mr-12 bg-primary/5 rounded-full transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 -mb-8 -ml-8 bg-primary/5 rounded-full transition-transform duration-300 group-hover:scale-110" />

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-xl font-semibold mb-6 text-primary group-hover:translate-x-1 transition-transform duration-300">
                            {service.title}
                          </h3>
                          {service.services && (
                            <ul className="space-y-3">
                              {service.services.map((item, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-center text-muted-foreground group-hover:translate-x-1 transition-transform duration-300"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                    <Check className="h-3 w-3 text-primary" />
                                  </div>
                                  <span className="text-sm">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-background transition-colors shadow-lg"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-background transition-colors shadow-lg"
                onClick={scrollNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Companies We've Worked With */}
      <section className="py-20 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">Companies We've Worked With</h2>
          </ScrollReveal>
          {/* Desktop View */}
          <motion.div 
            className="relative h-[80px] bg-background rounded-xl p-6 hidden md:block"
          >
            <div className="flex items-center justify-between h-full">
              {COMPANY_COLLABORATIONS.map((company, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center px-4"
                  whileHover={{ 
                    scale: 1.2,
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-w-[120px] h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      objectFit: 'contain',
                      maxHeight: '40px',
                      width: 'auto',
                      filter: 'none',
                      backgroundColor: 'transparent'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={companiesRef}>
              <div className="flex">
                {COMPANY_COLLABORATIONS.map((company, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_50%] min-w-0 px-4 flex items-center justify-center"
                  >
                    <div className="bg-background rounded-xl p-4 w-full flex items-center justify-center">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-w-full h-auto"
                        style={{
                          objectFit: 'contain',
                          maxHeight: '30px',
                          width: 'auto',
                          filter: 'none',
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              With over three decades of experience in groundworks and civil engineering,
              we deliver excellence in every project.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                {
                  icon: Clock,
                  title: "30+ Years Experience",
                  description: "Decades of expertise in groundworks and civil engineering projects.",
                  points: ["Professional project delivery", "Industry expertise"]
                },
                {
                  icon: Users,
                  title: "Qualified Professionals",
                  description: "Expert team of certified and skilled construction specialists.",
                  points: ["Certified team members", "Ongoing training"]
                },
                {
                  icon: Award,
                  title: "Quality Guaranteed",
                  description: "Commitment to excellence with industry-leading standards.",
                  points: ["Quality assurance", "Regular inspections"]
                },
                {
                  icon: Users,
                  title: "Friendly Team",
                  description: "A dedicated team that combines expertise with a friendly, approachable service.",
                  points: ["Excellent communication", "Customer satisfaction"]
                }
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div
                    className="relative overflow-hidden rounded-xl bg-background p-6 shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-[320px] flex flex-col"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-primary/10 rounded-full" />
                    <item.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                    <ul className="mt-4 space-y-2">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      <ScrollIndicator />
    </PageTransition>
  );
}

const detailedServices = [
  ...SERVICES,
  {
    title: "Site Preparation",
    description: "Comprehensive site preparation including clearing, leveling, and ground stabilization.",
    image: "https://images.unsplash.com/photo-1482731215275-a1f151646268"
  },
  {
    title: "Foundation Work",
    description: "Expert foundation construction for all types of buildings and structures.",
    image: "https://images.unsplash.com/photo-1495036019936-220b29b930ea"
  },
  {
    title: "Infrastructure Development",
    description: "Complete infrastructure solutions including roads, utilities, and drainage systems.",
    image: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a"
  }
];