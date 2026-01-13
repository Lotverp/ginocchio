-- Create site_settings table for dynamic configuration
CREATE TABLE public.site_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    key text UNIQUE NOT NULL,
    value text NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Anyone can read site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Insert default server address
INSERT INTO public.site_settings (key, value, description)
VALUES ('server_address', 'beta.qwer.name:25599', 'Indirizzo del server Minecraft');

-- Create trigger for timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update admin user credentials (username: pippo, password: baudo)
-- Using bcrypt hash for 'baudo'
UPDATE public.admin_users 
SET username = 'pippo', 
    password_hash = '$2a$10$YHNlY3JldFBhc3N3b3JkSGFzaEZvckJhdWRvMTIzNDU2Nzg5MDEyMw'
WHERE username = 'admin';