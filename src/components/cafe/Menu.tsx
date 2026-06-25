import { Palette, Sparkles, Brush, Cake, Flower2, CircleDot, SprayCan } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import potteryImg from "@/assets/workshop-pottery.jpg";
import canvasImg from "@/assets/workshop-canvas.jpg";
import hairbrushImg from "@/assets/workshop-hairbrush.jpg";
import cakeImg from "@/assets/workshop-cake.jpg";
import ceramicImg from "@/assets/workshop-ceramic.jpg";
import mirrorImg from "@/assets/workshop-mirror.jpg";
import bouquetImg from "@/assets/workshop-bouquet.jpg";

const workshops = [
  {
    name: "Pottery",
    icon: CircleDot,
    image: potteryImg,
    desc: "Shape your own clay creation on the wheel and by hand.",
  },
  {
    name: "Canvas Painting",
    icon: Brush,
    image: canvasImg,
    desc: "Express yourself on canvas with acrylics and gentle guidance.",
  },
  {
    name: "Hairbrush Painting",
    icon: SprayCan,
    image: hairbrushImg,
    desc: "Paint a personalized wooden hairbrush — a charming little keepsake.",
  },
  {
    name: "Cake Painting",
    icon: Cake,
    image: cakeImg,
    desc: "Decorate a cake like a canvas — edible art you can share.",
  },
  {
    name: "Ceramic Painting",
    icon: Palette,
    image: ceramicImg,
    desc: "Hand-paint a ceramic piece — mug, plate, or trinket dish.",
  },
  {
    name: "Mirror Painting",
    icon: Sparkles,
    image: mirrorImg,
    desc: "Turn a plain mirror into a decorative piece for your home.",
  },
  {
    name: "Flower Bouquet",
    icon: Flower2,
    image: bouquetImg,
    desc: "Arrange your own bouquet from seasonal fresh flowers.",
  },
];

export function Menu() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="menu" className="py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Palette className="h-4 w-4" />
            <span>Weekly Workshops</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A Workshop for Every Day
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A new creative experience each day of the week — paired with freshly brewed
            coffee and homemade desserts.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prefer a different day? Just mention it in the reservation note — we&apos;ll do
          our best to accommodate you. ☕🎨
        </p>
      </div>
    </section>
  );
}
