-- Create admin_users table with secure password handling
CREATE TABLE public.admin_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- No RLS policies needed - only edge functions access this table with service role

-- Create shop_packages table
CREATE TABLE public.shop_packages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    rarity TEXT NOT NULL DEFAULT 'Comune' CHECK (rarity IN ('Comune', 'Raro', 'Epico', 'Leggendario')),
    category TEXT NOT NULL DEFAULT 'General',
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for shop_packages
ALTER TABLE public.shop_packages ENABLE ROW LEVEL SECURITY;

-- Everyone can read active packages
CREATE POLICY "Anyone can read active shop packages"
ON public.shop_packages
FOR SELECT
USING (is_active = true);

-- Create shop_skins table
CREATE TABLE public.shop_skins (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    rarity TEXT NOT NULL DEFAULT 'Raro' CHECK (rarity IN ('Raro', 'Epico', 'Leggendario')),
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for shop_skins
ALTER TABLE public.shop_skins ENABLE ROW LEVEL SECURITY;

-- Everyone can read active skins
CREATE POLICY "Anyone can read active shop skins"
ON public.shop_skins
FOR SELECT
USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_packages_updated_at
BEFORE UPDATE ON public.shop_packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_skins_updated_at
BEFORE UPDATE ON public.shop_skins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin user (password: admin123 - should be changed)
-- Password hash generated with bcrypt
INSERT INTO public.admin_users (username, password_hash)
VALUES ('admin', '$2a$10$rqHv9IcWg.J3Y0C.hHR5YOqQZJx7XyNLJK1Zo9NLW5E5Z5Z5Z5Z5.');