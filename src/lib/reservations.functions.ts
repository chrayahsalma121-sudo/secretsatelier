import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(120)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  age: z.coerce.number().int().min(4, "Min age is 4").max(120),
  workshop: z.enum(WORKSHOPS),
  notes: z.string().trim().max(1000).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator((data) => reservationSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendReservationEmail } = await import("@/lib/email.server");
    await sendReservationEmail({
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      age: data.age,
      workshop: data.workshop,
      notes: data.notes,
    });
    return { success: true };
  });
