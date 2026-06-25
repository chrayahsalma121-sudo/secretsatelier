import { MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function MapSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="map" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            <span>Find Us</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Visit Secrets Atelier
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We are located on Av Abderrahim Bouabid in Tetouan, ready to welcome you with
            warmth and creativity.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-lg">
          <iframe
            title="Secrets Atelier location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.449012033635!2d-5.368547684769789!3d35.57851068021559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b4248d3d3d3d3%3A0x8f3d3d3d3d3d3d3d!2sAv.%20Abderrahim%20Bouabid%2C%20T%C3%A9touan%2C%20Morocco!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
