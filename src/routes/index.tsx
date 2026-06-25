import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/cafe/Navbar";
import { Hero } from "@/components/cafe/Hero";
import { About } from "@/components/cafe/About";
import { Menu } from "@/components/cafe/Menu";
import { Gallery } from "@/components/cafe/Gallery";
import { ReservationForm } from "@/components/cafe/ReservationForm";
import { Feedback } from "@/components/cafe/Feedback";
import { MapSection } from "@/components/cafe/Map";
import { Social } from "@/components/cafe/Social";
import { Footer } from "@/components/cafe/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secrets Atelier | Art Café in Tetouan" },
      { name: "description", content: "Paint, relax, and create memories at Secrets Atelier, a cozy art café in Tetouan serving coffee, desserts, and creative experiences." },
      { property: "og:title", content: "Secrets Atelier | Art Café in Tetouan" },
      { property: "og:description", content: "Paint, relax, and create memories at our cozy art café in Tetouan." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Feedback />
      <ReservationForm />
      <MapSection />
      <Social />
      <Footer />
    </main>
  );
}
