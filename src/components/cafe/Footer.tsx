import { Clock, Phone, MapPin, Paintbrush } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground py-16 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Paintbrush className="h-6 w-6 text-primary" />
              <span className="font-display text-2xl font-bold">Secrets Atelier</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-background/70">
              Paint, relax, and create memories in Tetouan&apos;s coziest art café.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Opening Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Daily: 10:00 AM – 9:00 PM
              </li>
              <li>Friday: 2:00 PM – 9:00 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+212661269396" className="hover:text-background">
                  06 61 26 93 96
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Address</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Av Abderrahim Bouabid, n90, Tetouan 93000, Morocco
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/60">
          <p>© {new Date().getFullYear()} Secrets Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
