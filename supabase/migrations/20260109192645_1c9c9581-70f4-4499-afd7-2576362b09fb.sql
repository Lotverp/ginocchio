-- Create shop_packages table
CREATE TABLE public.shop_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  rarity TEXT NOT NULL DEFAULT 'Comune',
  category TEXT NOT NULL DEFAULT 'General',
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shop_skins table
CREATE TABLE public.shop_skins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  rarity TEXT NOT NULL DEFAULT 'Raro',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables (admin only via edge function, so no policies needed for public access)
ALTER TABLE public.shop_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_skins ENABLE ROW LEVEL SECURITY;

-- Create public read policy for active items (for shop display)
CREATE POLICY "Active packages are viewable by everyone" 
ON public.shop_packages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Active skins are viewable by everyone" 
ON public.shop_skins 
FOR SELECT 
USING (is_active = true);

-- Create storage bucket for shop images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('shop-images', 'shop-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for shop images (public read, admin upload via edge function)
CREATE POLICY "Shop images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'shop-images');

CREATE POLICY "Anyone can upload shop images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'shop-images');

CREATE POLICY "Anyone can update shop images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'shop-images');

CREATE POLICY "Anyone can delete shop images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'shop-images');