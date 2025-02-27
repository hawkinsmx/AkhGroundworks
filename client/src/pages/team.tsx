import { TEAM_MEMBERS } from "@/lib/constants";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Team() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <h1 className="text-4xl font-bold mb-8">Our Team</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              Meet the experienced professionals behind AKH Groundworks. Our team brings together
              decades of expertise in groundworks and civil engineering.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.div
                  className="bg-card rounded-lg overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground mb-6">{member.description}</p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our growing team.
                If you're passionate about groundworks and civil engineering, we'd love to hear from you.
              </p>
              <Button size="lg">
                View Open Positions
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
