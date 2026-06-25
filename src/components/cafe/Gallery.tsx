import galleryPainting from "@/assets/gallery-painting.jpg";
import galleryDesserts from "@/assets/gallery-desserts.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryFriends from "@/assets/gallery-friends.jpg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Paintbrush } from "lucide-react";

const images = [
  {
    src: galleryPainting,
    alt: "Hands painting on canvas in a relaxing art session",
    title: "Art Activities",
  },
  {
    src: galleryDesserts,
    alt: "Beautiful café desserts and drinks on a wooden table",
    title: "Drinks & Desserts",
  },
  {
    src: galleryInterior,
    alt: "Cozy interior corner of Secrets Atelier",
    title: "Cozy Interior",
  },
  {
    src: galleryFriends,
    alt: "Friends enjoying a painting session together",
    title: "Paint Sessions",
  },
];

export function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="gallery" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Paintbrush className="h-4 w-4" />
            <span>Gallery</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Moments We Cherish
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A peek into the warmth, creativity, and sweetness that make Secrets Atelier special.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={image.title}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/70 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="font-display text-2xl font-semibold text-background">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
