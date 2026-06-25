import { Coffee, Heart, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function About() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Our Story</span>
          </div>

          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Where Creativity Meets Indulgence
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Welcome to our atelier — a unique space combining hands-on art workshops
              with a cozy bakery experience. From ceramic and canvas painting to pottery,
              cake decorating, and flower bouquets, every day brings a new way to create.
            </p>
            <p>
              Sip on freshly brewed coffee, savour homemade desserts, and let yourself
              be inspired. Whether you come to create, relax, or simply share a sweet
              moment with people you love — every visit is designed to delight.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Coffee, label: "Art & Coffee", desc: "Create while you sip" },
              { icon: Heart, label: "Cozy Vibes", desc: "Feels like home" },
              { icon: Sparkles, label: "A New Workshop Daily", desc: "Something for everyone" },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-2xl bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <Icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
