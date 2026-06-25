CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  number_of_people INTEGER NOT NULL CHECK (number_of_people > 0 AND number_of_people <= 20),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservations TO anon;
GRANT SELECT ON public.reservations TO service_role;
GRANT UPDATE ON public.reservations TO service_role;
GRANT DELETE ON public.reservations TO service_role;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a reservation" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can manage all reservations" ON public.reservations FOR ALL TO service_role USING (true) WITH CHECK (true);