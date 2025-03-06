import { SERVICES } from "@/lib/constants";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCallback } from "react";

export default function Services() {
  const ServiceImageCarousel = ({ images }: { images: string[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
      <div className="relative">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {images.map((image, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0">
                <div className="relative min-h-[300px] max-h-[500px] flex items-center justify-center">
                  <img
                    src={image}
                    alt="Service demonstration"
                    className="w-full h-auto max-h-[500px] object-contain"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
                      e.currentTarget.src = '/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-background/90 transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-background/90 transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <h1 className="text-4xl font-bold mb-8">Our Services</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              AKH Groundworks LTD provides comprehensive groundworks and civil engineering
              services for commercial and residential projects of all sizes.
            </p>
          </ScrollReveal>

          <div className="space-y-16">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  <motion.div
                    className="w-full md:w-1/2"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ServiceImageCarousel images={service.images} />
                  </motion.div>

                  <motion.div
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-br from-card to-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group">
                      {/* Decorative accents */}
                      <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-primary/5 rounded-full transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-primary/5 rounded-full transition-transform duration-300 group-hover:scale-110" />

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-2xl font-semibold text-primary mb-4 group-hover:translate-x-1 transition-transform duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          {service.description}
                        </p>
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
                                <span className="text-lg">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}