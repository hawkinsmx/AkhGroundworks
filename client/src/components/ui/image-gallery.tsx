import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
  title: string;
}

interface ImageGalleryProps {
  images: Image[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="relative max-w-6xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}