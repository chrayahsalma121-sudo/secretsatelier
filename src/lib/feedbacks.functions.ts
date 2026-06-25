import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(60),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(5, "Please share a little more").max(500),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export type FeedbackItem = {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
};

export const createFeedback = createServerFn({ method: "POST" })
  .inputValidator((data) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendFeedbackEmail } = await import("@/lib/email.server");
    await sendFeedbackEmail({
      name: data.name,
      rating: data.rating,
      message: data.message,
    });
    return { success: true };
  });

// No database — return empty list; the feedback wall is removed
export const listFeedbacks = createServerFn({ method: "GET" })
  .handler(async (): Promise<FeedbackItem[]> => {
    return [];
  });
