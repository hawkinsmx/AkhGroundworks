import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

interface TeamProfileProps {
  member: TeamMember;
  index: number;
}

export function TeamProfile({ member, index }: TeamProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg"
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
        <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
        <p className="text-primary font-medium mb-4">{member.role}</p>
        <p className="text-muted-foreground mb-4">{member.bio}</p>
        <div className="flex flex-wrap gap-2">
          {member.specialties.map((specialty, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-sm"
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
