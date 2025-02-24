import { ImageGallery } from "@/components/ui/image-gallery";
import { PORTFOLIO_IMAGES } from "@/lib/constants";

export default function Portfolio() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          Browse through our completed projects and see the quality of work we deliver.
          From residential developments to commercial infrastructure, we take pride in
          every project we undertake.
        </p>

        <ImageGallery
          images={PORTFOLIO_IMAGES}
          className="mb-12"
        />

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Want to discuss your project?</h2>
          <p className="text-muted-foreground mb-4">
            We're ready to help you with your next groundworks or civil engineering project.
            Contact us today for a consultation and quote.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
