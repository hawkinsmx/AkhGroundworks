import { ImageGallery } from "@/components/ui/image-gallery";
import { PORTFOLIO_IMAGES } from "@/lib/constants";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <h1 className="text-4xl font-bold mb-8">Our Portfolio</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              Browse through our completed projects and see the quality of work we deliver.
              From residential developments to commercial infrastructure, we take pride in
              every project we undertake.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ImageGallery
              images={PORTFOLIO_IMAGES}
              className="mb-12"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <motion.div 
              className="bg-muted p-8 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Want to discuss your project?</h2>
              <p className="text-muted-foreground mb-4">
                We're ready to help you with your next groundworks or civil engineering project.
                Contact us today for a consultation and quote.
              </p>
              <motion.a
                href="/contact"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}