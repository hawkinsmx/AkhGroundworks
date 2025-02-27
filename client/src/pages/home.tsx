import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { HERO_IMAGE, SERVICES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

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

        {/* Services Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div
                    className="group relative overflow-hidden rounded-lg cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setLocation('/services')}
                  >
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 p-6 flex items-end justify-center">
                      <h3 className="text-xl font-semibold text-white text-center">{service.title}</h3>
                    </div>
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
      </div>
    </PageTransition>
  );
}