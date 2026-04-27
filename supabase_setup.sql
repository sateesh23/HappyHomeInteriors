-- Supabase Master Configuration Script for Happy Home Interiors

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  client_name text,
  location text,
  description text,
  image_url text,
  order_index integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  location text,
  project_name text,
  text text NOT NULL,
  rating integer DEFAULT 5,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  message text,
  status text DEFAULT 'new', -- 'new', 'contacted', 'closed'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Video Testimonials (YouTube Shorts for the scrolling marquee)
CREATE TABLE IF NOT EXISTS public.video_testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_testimonials ENABLE ROW LEVEL SECURITY;


-- 3. Configure Policies

-- Projects: Anyone can read, only Service Role (Server) can modify
CREATE POLICY "Public profiles are viewable by everyone." ON public.projects FOR SELECT USING (true);

-- Testimonials: Anyone can read, only Service Role (Server) can modify
CREATE POLICY "Public testimonials are viewable by everyone." ON public.testimonials FOR SELECT USING (true);

-- Services: Anyone can read, only Service Role (Server) can modify
CREATE POLICY "Public services are viewable by everyone." ON public.services FOR SELECT USING (true);

-- Video Testimonials: Anyone can read, Service Role handles inserts/deletes
CREATE POLICY "Public can read video testimonials." ON public.video_testimonials FOR SELECT USING (true);

-- Enquiries: Anyone can insert (using web forms), but normal users cannot read them
CREATE POLICY "Public can insert enquiries." ON public.enquiries FOR INSERT WITH CHECK (true);

-- Note: The Service Role Key inherently bypasses RLS, so it has implicit ALL privileges.

-- 4. Set up Storage for Gallery uploaded by Admin
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies:
-- Gallery images are publicly accessible
CREATE POLICY "Gallery images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- Allow authenticated users to upload to gallery? Our admin relies on Service Key, so implicit access exists!
-- We'll explicitly allow it just in case:
CREATE POLICY "Anyone can upload to gallery (Temporary fallback for Admin)" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');
CREATE POLICY "Anyone can update gallery (Temporary fallback for Admin)" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery');
CREATE POLICY "Anyone can delete gallery (Temporary fallback for Admin)" ON storage.objects FOR DELETE USING (bucket_id = 'gallery');

-- 5. Seed Initial Service Data (Mocked defaults if empty)
INSERT INTO public.services (title, description, order_index) VALUES 
('Modular Kitchen', 'Bespoke, ergonomic kitchen layouts blending utility and elegance seamlessly.', 1),
('False Ceiling & Floorings', 'Architectural ceiling depth and premium flooring materials crafted to perfection.', 2),
('Bedroom & Wardrobes', 'Luxurious primary suites with intelligent, built-in structural wardrobe systems.', 3),
('Full Home Turnkey', 'Complete end-to-end transformation taking your empty shell to a finished masterpiece.', 4),
('Waterproof Roof & Cooling', 'Advanced structural waterproofing and thermal roof cooling treatments.', 5),
('Exterior Design', 'Striking facade transformations and aesthetic exterior modeling.', 6)
ON CONFLICT DO NOTHING;
