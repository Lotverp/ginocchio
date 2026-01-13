import { motion } from "framer-motion";
import { Heart, ExternalLink, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useServerSettings } from "@/hooks/useServerSettings";

const footerLinks = {
  server: [
    { name: "Come Giocare", href: "/come-giocare" },
    { name: "Tutorial Video", href: "/tutorial" },
    { name: "La Mod", href: "/la-mod" },
  ],
  shop: [
    { name: "Shop", href: "/shop" },
  ],
  community: [
    { name: "Discord", href: "https://discord.gg/tuoserver", external: true },
    { name: "TikTok", href: "https://tiktok.com/@tuoserver", external: true },
    { name: "Instagram", href: "https://instagram.com/tuoserver", external: true },
    { name: "Telegram", href: "https://t.me/tuoserver", external: true },
  ],
};

const Footer = () => {
  const { serverAddress } = useServerSettings();
  
  return (
    <footer className="relative pt-24 pb-8 border-t border-border overflow-hidden">
      {/* Background effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 pixel-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <motion.div 
                className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <span className="font-minecraft text-xs text-primary-foreground">P2</span>
              </motion.div>
              <div>
                <span className="font-minecraft text-sm text-gradient-primary block">PROMINENCE II</span>
                <span className="text-xs text-muted-foreground font-body">Italian Server</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 font-body leading-relaxed max-w-sm">
              Il server Minecraft italiano dedicato alla modpack Prominence II. 
              Avventura, magia e community ti aspettano!
            </p>
            
            {/* Server IP */}
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 inline-flex"
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <Gamepad2 className="w-4 h-4 text-muted-foreground" />
              <span className="font-pixel text-base text-accent">{serverAddress}</span>
            </motion.div>
          </div>

          {/* Server Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Server</h4>
            <ul className="space-y-3">
              {footerLinks.server.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-muted-foreground font-body">
              <span>© 2025 Prominence II Italian Server</span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center gap-1">
                <span className="font-pixel">Versione: 1.20.1</span>
              </span>
            </div>
            
            <motion.div 
              className="flex items-center gap-1 text-sm text-muted-foreground font-body"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1 animate-pulse" /> per la community
            </motion.div>
          </div>
          
          {/* Disclaimer */}
          <p className="mt-6 text-xs text-muted-foreground/60 text-center max-w-3xl mx-auto font-body">
            Questo server non è affiliato con Mojang Studios. Minecraft è un marchio registrato di Mojang Studios.
            Prominence II è una modpack creata dalla community disponibile su CurseForge.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;