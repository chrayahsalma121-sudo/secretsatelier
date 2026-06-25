import heroCafe from "@/assets/hero-cafe.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart } from "lucide-react";

export function Hero() {
  const scrollToReserve = () => {
    const element = document.querySelector("#reserve");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroCafe}
          alt="Cozy art café interior with warm lighting and creative atmosphere"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm animate-[slide-up_0.6s_ease-out]">
          <Heart className="h-4 w-4 text-accent fill-accent" />
          Where creativity meets indulgence ✨
        </div>

        <h1 className="font-display text-5xl font-light italic tracking-wide text-background sm:text-6xl md:text-7xl lg:text-8xl animate-[fade-in_0.8s_ease-out]">
          Secrets Atelier
        </h1>

        <p className="mt-6 font-body text-lg text-background/90 sm:text-xl md:text-2xl animate-[slide-up_0.8s_ease-out_0.2s_both]">
          Art workshops, coffee & homemade desserts — more than a workshop, an experience.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-[slide-up_0.8s_ease-out_0.4s_both]">
          <Button
            size="lg"
            onClick={scrollToReserve}
            className="rounded-full bg-background px-8 py-6 text-base font-semibold text-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Book a Workshop
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToAbout}
            className="rounded-full border-background/80 bg-transparent px-8 py-6 text-base font-semibold text-background backdrop-blur-sm transition-all hover:bg-background/20 hover:text-background"
          >
            Discover More
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-background/80 hover:text-background"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
