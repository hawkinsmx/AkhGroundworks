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

          <div className="space-y-16">
            {detailedServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  <motion.div
                    className="w-full md:w-1/2"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-[400px] overflow-hidden rounded-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                        <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="w-full md:w-1/2 p-6 bg-card rounded-lg"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold text-primary mb-4">{service.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">{service.description}</p>
                    {service.services && (
                      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        {service.services.map((item, idx) => (
                          <li key={idx} className="text-lg">{item}</li>
                        ))}
                      </ul>
                    )}
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