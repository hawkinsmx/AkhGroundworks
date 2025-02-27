import { SERVICES } from "@/lib/constants";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";

export default function Services() {
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
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <h1 className="text-4xl font-bold mb-8">Our Services</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              AKH Groundworks LTD provides comprehensive groundworks and civil engineering
              services for commercial and residential projects of all sizes.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="relative h-[400px] overflow-hidden rounded-lg group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    initial={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/50 flex items-end p-6"
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-primary mb-4">{service.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}