ALTER TABLE public.reservations
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS age integer,
  ADD COLUMN IF NOT EXISTS workshop text;

ALTER TABLE public.reservations
  ALTER COLUMN reservation_date DROP NOT NULL,
  ALTER COLUMN reservation_time DROP NOT NULL,
  ALTER COLUMN number_of_people DROP NOT NULL;