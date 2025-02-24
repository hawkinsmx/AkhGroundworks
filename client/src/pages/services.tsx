import { SERVICES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          AKH Groundworks LTD provides comprehensive groundworks and civil engineering
          services for commercial and residential projects of all sizes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedServices.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
