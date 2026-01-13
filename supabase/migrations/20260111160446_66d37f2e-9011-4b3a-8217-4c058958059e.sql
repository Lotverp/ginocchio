-- Drop only the check constraints on rarity
ALTER TABLE public.shop_packages DROP CONSTRAINT IF EXISTS shop_packages_rarity_check;
ALTER TABLE public.shop_skins DROP CONSTRAINT IF EXISTS shop_skins_rarity_check;