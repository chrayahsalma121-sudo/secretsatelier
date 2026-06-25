import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Quote, Star, Send, Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createFeedback } from "@/lib/feedbacks.functions";

function StarRow({
  value,
  onChange,
  size = "h-5 w-5",
  interactive = false,
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: string;
  interactive?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        const cls = `${size} transition-colors ${
          filled ? "fill-accent text-accent" : "text-muted-foreground/40"
        }`;
        if (!interactive) return <Star key={n} className={cls} />;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange?.(n)}
            className="cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star className={cls} />
          </button>
        );
      })}
    </div>
  );
}

export function Feedback() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const createFn = useServerFn(createFeedback);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (input: { name: string; rating: number; message: string }) =>
      createFn({ data: input }),
    onSuccess: () => {
      toast.success("Thank you for your kind words ✨");
      setName("");
      setRating(5);
      setMessage("");
    },
    onError: (err: Error) => toast.error(err.message ?? "Could not send feedback"),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || message.trim().length < 5) {
      toast.error("Please add your name and a short message");
      return;
    }
    mutation.mutate({ name: name.trim(), rating, message: message.trim() });
  };

  return (
    <section id="feedback" className="py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Quote className="h-4 w-4" />
            <span>Kind Words</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Share Your Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Leave a little note — your words help our atelier grow.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-lg relative rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border/60"
          >
            <div className="absolute -top-4 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Quote className="h-4 w-4" />
            </div>

            <h3 className="font-display text-2xl font-semibold text-foreground">
              Leave your feedback
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us about your visit — we read every word.
            </p>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-name">Your name</Label>
                <Input
                  id="fb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <StarRow value={rating} onChange={setRating} interactive size="h-7 w-7" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fb-message">Your message</Label>
                <Textarea
                  id="fb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" disabled={mutation.isPending} className="w-full">
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
