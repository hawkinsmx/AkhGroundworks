import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";
import { COMPANY_LOGO } from "@/lib/constants";
import { 
  ArrowRight, 
  Layers, 
  Fence, 
  TreePine, 
  Droplets, 
  LayoutGrid, 
  Car,
  Phone,
  CheckCircle2,
  Mail,
  Globe
} from "lucide-react";

const smallWorksServices = [
  {
    title: "Slabbing",
    description: "Professional patio and pathway slabbing with precision laying and quality materials for lasting results.",
    icon: Layers,
    features: ["Patio Installation", "Pathway Design", "Natural Stone", "Concrete Slabs"]
  },
  {
    title: "Fencing",
    description: "Secure and stylish fencing solutions for residential and commercial properties.",
    icon: Fence,
    features: ["Panel Fencing", "Close Board", "Post & Rail", "Gate Installation"]
  },
  {
    title: "Landscaping",
    description: "Transform your outdoor space with our comprehensive landscaping services.",
    icon: TreePine,
    features: ["Garden Design", "Turfing", "Planting", "Retaining Walls"]
  },
  {
    title: "Drainage",
    description: "Expert drainage solutions to protect your property from water damage.",
    icon: Droplets,
    features: ["French Drains", "Soakaways", "Channel Drains", "Land Drainage"]
  },
  {
    title: "Block Paving",
    description: "Beautiful and durable block paving for driveways, patios and pathways.",
    icon: LayoutGrid,
    features: ["Pattern Design", "Edging", "Sealing", "Restoration"]
  },
  {
    title: "Driveways",
    description: "Complete driveway installations from excavation to finishing touches.",
    icon: Car,
    features: ["Tarmac", "Gravel", "Concrete", "Block Paved"]
  }
];

export default function SmallWorks() {
  return (
    <PageTransition>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <img 
                src={COMPANY_LOGO} 
                alt="AKH Groundworks Logo" 
                className="h-32 md:h-40 w-auto mx-auto drop-shadow-2xl"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-block text-2xl md:text-3xl mb-6 font-ethnocentric tracking-wide" style={{ color: '#929497' }}>
                Small Works Division
              </span>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-primary">Small Works</span>
              <br />
              <span className="text-foreground">Big Results</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              From garden transformations to driveway installations, our dedicated small works team 
              delivers the same professional quality you expect from AKH Groundworks.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Our Work
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive small works solutions for residential and commercial properties
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smallWorksServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Professional Service,
                  <br />
                  <span className="text-primary">Personal Touch</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  With over 30 years of experience in groundworks and civil engineering, 
                  our small works division brings the same level of professionalism and 
                  quality to every residential project, no matter the size.
                </p>
                <div className="space-y-4">
                  {[
                    "Free, no-obligation quotes",
                    "Fully insured and certified",
                    "Quality materials guaranteed",
                    "Clean and tidy workmanship",
                    "Competitive pricing"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img 
                  src="/small-works-logo.png" 
                  alt="AKH Groundworks Small Works Division" 
                  className="h-40 w-auto mx-auto mb-8"
                />
                <div className="absolute inset-0 top-48 bg-gradient-to-br from-primary/30 to-primary/5 rounded-3xl blur-2xl" />
                <div className="relative bg-card border border-border rounded-3xl p-6 md:p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                    <p className="text-muted-foreground mb-4">
                      Contact our small works team today for a free consultation and quote.
                    </p>
                    <a href="tel:07904952238">
                      <Button size="lg" className="w-full text-lg">
                        <Phone className="mr-2 h-5 w-5" />
                        07904 952238
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Transform Your Outdoor Space
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Get in touch for a free quote on your next project
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-foreground mb-4">Works We Perform</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "Slabbing & Patio Installation",
                  "Fencing & Gate Installation",
                  "Landscaping & Garden Design",
                  "Drainage Solutions",
                  "Block Paving",
                  "Driveway Installation"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-primary-foreground">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center md:text-left">
              <h3 className="text-xl font-bold text-primary-foreground mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a href="tel:07904952238" className="flex items-center justify-center md:justify-start gap-2 text-primary-foreground hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                  <span>07904 952238</span>
                </a>
                <a href="mailto:info@akhgroundworks.co.uk" className="flex items-center justify-center md:justify-start gap-2 text-primary-foreground hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>info@akhgroundworks.co.uk</span>
                </a>
                <a href="https://www.akhgroundworks.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-primary-foreground hover:text-white transition-colors">
                  <Globe className="h-5 w-5" />
                  <span>www.akhgroundworks.co.uk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
