import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { createReservation } from "@/lib/reservations.functions";
import { toast } from "sonner";

const WORKSHOPS = [
  "Pottery",
  "Canvas Painting",
  "Hairbrush Painting",
  "Cake Painting",
  "Ceramic Painting",
  "Mirror Painting",
  "Flower Bouquet",
] as const;

const reservationSchema = z.object({
  name: z.string().trim().min(2, "First name is required").max(80),
  last_name: z.string().trim().min(2, "Last name is required").max(80),
  phone: z.string().trim().min(6, "Phone number is too short").max(30),
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(120)
    .optional()
    .or(z.literal("")),
  age: z.coerce.number().int().min(4, "Min age is 4").max(120),
  workshop: z.enum(WORKSHOPS, { message: "Please pick a workshop" }),
  notes: z.string().trim().max(1000).optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export function ReservationForm() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const workshopValue = watch("workshop");

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      await createReservation({
        data: {
          name: data.name,
          last_name: data.last_name,
          phone: data.phone,
          email: data.email || undefined,
          age: data.age,
          workshop: data.workshop,
          notes: data.notes,
        },
      });
      toast.success("Reservation sent! We'll contact you to confirm the day.");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              <span>Reservations</span>
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Book Your Workshop
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pick the workshop you&apos;d love to try. Tell us your preferred day (or
              days you can&apos;t make it) in the note — we&apos;ll get back to you to
              confirm.
            </p>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                All materials included
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Friendly guidance for every skill level
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Coffee & homemade dessert included
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl bg-card p-6 shadow-lg sm:p-8"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">First name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="mt-1.5 rounded-xl border-input bg-background"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    {...register("last_name")}
                    className="mt-1.5 rounded-xl border-input bg-background"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-destructive">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="mt-1.5 rounded-xl border-input bg-background"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min={4}
                    max={120}
                    {...register("age")}
                    className="mt-1.5 rounded-xl border-input bg-background"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-destructive">{errors.age.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">
                  Email <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1.5 rounded-xl border-input bg-background"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="workshop">Workshop</Label>
                <Select
                  value={workshopValue}
                  onValueChange={(v) =>
                    setValue("workshop", v as (typeof WORKSHOPS)[number], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    id="workshop"
                    className="mt-1.5 rounded-xl border-input bg-background"
                  >
                    <SelectValue placeholder="Pick a workshop" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORKSHOPS.map((w) => (
                      <SelectItem key={w} value={w}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workshop && (
                  <p className="mt-1 text-sm text-destructive">{errors.workshop.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">
                  Note <span className="text-muted-foreground">(preferred day, etc.)</span>
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="e.g. I'd prefer Saturday afternoon, can't make Monday."
                  {...register("notes")}
                  className="mt-1.5 rounded-xl border-input bg-background"
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-destructive">{errors.notes.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Reservation"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
