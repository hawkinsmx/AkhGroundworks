import { TEAM_MEMBERS } from "@/lib/constants";
import { TeamProfile } from "@/components/team/team-profile";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export default function Team() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <h1 className="text-4xl font-bold mb-8">Our Team</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              Meet the dedicated professionals behind AKH Groundworks. Our team brings
              together decades of experience in groundworks and civil engineering.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.2}>
                <TeamProfile member={member} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
