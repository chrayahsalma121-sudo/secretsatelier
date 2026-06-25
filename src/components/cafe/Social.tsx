import { Instagram, Facebook, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function Social() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="py-24 sm:py-32 bg-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`flex flex-col items-center text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Heart className="h-8 w-8 text-accent fill-accent" />
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Follow Our Journey
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Follow us for updates, events, and a daily dose of cozy café inspiration.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </div>

          <p className="mt-8 text-sm font-medium text-muted-foreground">
            @SecretsAtelier · Tetouan, Morocco
          </p>
        </div>
      </div>
    </section>
  );
}
