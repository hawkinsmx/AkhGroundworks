import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { HERO_IMAGE, SERVICES, COMPANY_COLLABORATIONS } from "@/lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';

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

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
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
              <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {detailedServices.map((service, index) => (
                      <motion.div
                        key={index}
                        className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                        onClick={() => setLocation('/services')}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative h-48 overflow-hidden rounded-lg cursor-pointer group">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-background/90 transition-colors"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-background/90 transition-colors"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Companies We've Worked With */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center mb-12">Companies We've Worked With</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {COMPANY_COLLABORATIONS.map((company, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="flex items-center justify-center p-4 bg-background rounded-lg"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "25+ Years Experience",
                "Qualified Professionals",
                "Quality Guaranteed",
                "Competitive Pricing"
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div
                    className="text-center p-6 bg-background rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{item}</h3>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ScrollIndicator />
      </div>
    </PageTransition>
  );
}