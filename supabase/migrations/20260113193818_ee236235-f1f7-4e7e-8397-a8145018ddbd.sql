-- Add images array column for multiple skin images
ALTER TABLE public.shop_skins 
ADD COLUMN images jsonb DEFAULT '[]'::jsonb;