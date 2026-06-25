CREATE TABLE public.feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.feedbacks TO anon, authenticated;
GRANT ALL ON public.feedbacks TO service_role;

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Feedbacks are publicly readable"
  ON public.feedbacks
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX feedbacks_created_at_idx ON public.feedbacks (created_at DESC);