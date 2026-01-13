import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useServerSettings } from "@/hooks/useServerSettings";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "La Mod", href: "/la-mod" },
  { name: "Come Giocare", href: "/come-giocare" },
  { name: "Tutorial", href: "/tutorial" },
  { name: "Shop", href: "/shop" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const { serverAddress } = useServerSettings();

  const copyIP = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-gradient-to-b from-background/90 to-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Minecraft-style sword/pickaxe icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground relative z-10" fill="currentColor">
                <path d="M14.5 2L4 12.5L7.5 16L18 5.5L14.5 2ZM16.5 7.5L9 15L10.5 16.5L18 9L16.5 7.5ZM3 18L6 21L9 18L6 15L3 18ZM5 19L6 20L7 19L6 18L5 19Z"/>
              </svg>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-minecraft text-sm text-gradient-primary block leading-tight">
                PROMINENCE
              </span>
              <span className="font-pixel text-xs text-muted-foreground">Italian Server</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 font-display text-sm font-medium transition-all relative group ${
                  location.pathname === link.href 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                <motion.span 
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: location.pathname === link.href ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            
            <motion.button
              onClick={copyIP}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-pixel text-base text-accent">{serverAddress}</span>
              <Copy className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
            
            <AnimatePresence>
              {copied && (
                <motion.span 
                  className="text-xs text-green-500 font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  ✓ Copiato!
                </motion.span>
              )}
            </AnimatePresence>
            
            <Link
              to="/shop"
              className="px-5 py-2 rounded-lg gradient-primary font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity glow-primary"
            >
              💎 Shop
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 border-t border-border bg-background/98 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`block py-3 font-display font-medium transition-colors ${
                      location.pathname === link.href 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="mt-4 pt-4 border-t border-border space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={copyIP}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-card/50"
                >
                  <span className="font-pixel text-lg text-accent">{serverAddress}</span>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
                <Link
                  to="/shop"
                  className="block py-3 text-center rounded-lg gradient-primary font-display font-semibold text-primary-foreground"
                >
                  💎 Vai allo Shop
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;