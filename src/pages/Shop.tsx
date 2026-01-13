import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, ShoppingCart, Sparkles, Crown, Star, Gem, Zap, Loader2, Shield, Clock, Gift, CreditCard, X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import bodyBase from "@/assets/skins/body.png";

interface ShopSkin {
  id: string;
  name: string;
  category: string;
  rarity: string;
  price: number;
  image_url: string | null;
  images: string[] | null;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

interface ShopPackage {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  rarity: string;
  category: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

const rarities = ["Tutti", "Comune", "Raro", "Epico", "Leggendario", "Elite"];

const rarityColors: Record<string, string> = {
  Comune: "text-gray-400 bg-gray-500/20 border-gray-500/30",
  Raro: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  Epico: "text-purple-400 bg-purple-500/20 border-purple-500/30",
  Leggendario: "text-amber-400 bg-amber-500/20 border-amber-500/30",
  Elite: "text-rose-400 bg-rose-500/20 border-rose-500/30",
};

const rarityGlowColors: Record<string, string> = {
  Comune: "shadow-gray-500/30",
  Raro: "shadow-blue-500/40",
  Epico: "shadow-purple-500/50",
  Leggendario: "shadow-amber-500/60",
  Elite: "shadow-rose-500/70",
};

const rarityIcons: Record<string, React.ElementType> = {
  Comune: Star,
  Raro: Star,
  Epico: Sparkles,
  Leggendario: Crown,
  Elite: Gem,
};

const packageIcons: Record<string, React.ElementType> = {
  Starter: Star,
  VIP: Gem,
  Premium: Crown,
  Leggenda: Zap,
};

const packageColors: Record<string, { color: string; borderColor: string; glowColor: string; bgGradient: string }> = {
  Starter: {
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    glowColor: "0 0 30px rgba(59, 130, 246, 0.3)",
    bgGradient: "from-blue-500/10 to-transparent",
  },
  VIP: {
    color: "text-primary",
    borderColor: "border-primary/50",
    glowColor: "0 0 40px rgba(168, 85, 247, 0.4)",
    bgGradient: "from-primary/20 to-transparent",
  },
  Premium: {
    color: "text-accent",
    borderColor: "border-accent/50",
    glowColor: "0 0 40px rgba(251, 191, 36, 0.4)",
    bgGradient: "from-accent/20 to-transparent",
  },
  Leggenda: {
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    glowColor: "0 0 50px rgba(234, 179, 8, 0.5)",
    bgGradient: "from-yellow-500/20 to-transparent",
  },
};

const guarantees = [
  { icon: Shield, title: "Sicuro al 100%", description: "Pagamenti sicuri tramite PayPal e Stripe" },
  { icon: Clock, title: "Attivazione Istantanea", description: "I vantaggi si attivano entro 5 minuti" },
  { icon: Gift, title: "Valido per Sempre", description: "Acquisti one-time, nessun abbonamento" },
  { icon: CreditCard, title: "Rimborso Garantito", description: "14 giorni per richiedere rimborso" },
];

const ShopPage = () => {
  const [selectedRarity, setSelectedRarity] = useState("Tutti");
  const [activeTab, setActiveTab] = useState<"packages" | "skins">("packages");
  const [cart, setCart] = useState<string[]>([]);
  const [skins, setSkins] = useState<ShopSkin[]>([]);
  const [packages, setPackages] = useState<ShopPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkin, setSelectedSkin] = useState<ShopSkin | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [skinsRes, packagesRes] = await Promise.all([
        supabase.from('shop_skins').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('shop_packages').select('*').eq('is_active', true).order('sort_order'),
      ]);

      if (skinsRes.data) setSkins(skinsRes.data.map(skin => ({
        ...skin,
        images: Array.isArray(skin.images) ? (skin.images as string[]) : [],
      })));
      if (packagesRes.data) {
        setPackages(packagesRes.data.map(pkg => ({
          ...pkg,
          features: Array.isArray(pkg.features) ? (pkg.features as string[]) : [],
        })));
      }
    } catch (err) {
      console.error('Load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSkins = skins.filter((skin) => {
    const rarityMatch = selectedRarity === "Tutti" || skin.rarity === selectedRarity;
    return rarityMatch;
  });

  const toggleCart = (itemId: string) => {
    setCart((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const totalPrice = cart.reduce((sum, id) => {
    const skin = skins.find((s) => s.id === id);
    const pkg = packages.find((p) => p.id === id);
    return sum + (skin?.price || pkg?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-body font-medium mb-4"
                whileHover={{ scale: 1.05 }}
              >
                💎 SHOP
              </motion.span>
              
              <motion.h1 
                className="font-minecraft text-3xl md:text-5xl mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                Negozio <span className="text-gradient-gold">Prominence II</span>
              </motion.h1>
              
              <motion.p 
                className="text-base text-muted-foreground mb-8 font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Supporta il server e personalizza la tua esperienza di gioco con pacchetti VIP e skin esclusive!
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                onClick={() => setActiveTab("packages")}
                className={`px-8 py-3 rounded-xl font-display font-bold text-lg transition-all ${
                  activeTab === "packages"
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 border border-border hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💎 Pacchetti VIP
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("skins")}
                className={`px-8 py-3 rounded-xl font-display font-bold text-lg transition-all ${
                  activeTab === "skins"
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 border border-border hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👤 Skin
              </motion.button>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {guarantees.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl border border-border bg-card/50 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>
          </div>
        )}

        {/* Packages Tab */}
        <AnimatePresence mode="wait">
          {!isLoading && activeTab === "packages" && (
            <motion.section 
              key="packages"
              className="py-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {packages.map((pkg, index) => {
                    const pkgStyle = packageColors[pkg.name] || packageColors.Starter;
                    const PkgIcon = packageIcons[pkg.name] || Star;
                    const isPopular = pkg.name === "VIP";
                    const isInCart = cart.includes(pkg.id);

                    return (
                      <motion.div
                        key={pkg.id}
                        className={`relative flex flex-col p-6 rounded-2xl border-2 bg-card/50 backdrop-blur-sm overflow-hidden
                          ${pkgStyle.borderColor} ${isInCart ? "ring-2 ring-green-500" : ""} group cursor-pointer`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -12, scale: 1.02, boxShadow: pkgStyle.glowColor }}
                      >
                        {/* Background gradient */}
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-t ${pkgStyle.bgGradient} opacity-0 group-hover:opacity-100`}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Popular Badge */}
                        {isPopular && (
                          <motion.div 
                            className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-xs font-bold text-primary-foreground flex items-center gap-1 z-20"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Sparkles className="w-3 h-3" /> Più Popolare
                          </motion.div>
                        )}

                        {/* Icon & Name */}
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                          <motion.div 
                            className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center ${pkgStyle.color}`}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          >
                            <PkgIcon className="w-7 h-7" />
                          </motion.div>
                          <div>
                            <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
                            <span className={`text-2xl font-bold ${pkgStyle.color}`}>{pkg.price.toFixed(2)}€</span>
                          </div>
                        </div>

                        {/* Description */}
                        {pkg.description && (
                          <p className="text-sm text-muted-foreground mb-4 relative z-10">{pkg.description}</p>
                        )}

                        {/* Features */}
                        <ul className="space-y-2 mb-6 flex-grow relative z-10">
                          {pkg.features.slice(0, 6).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-foreground/80">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Buy Button */}
                        <motion.button
                          onClick={() => toggleCart(pkg.id)}
                          className={`w-full py-3 rounded-xl font-display font-semibold transition-all relative z-10 ${
                            isInCart
                              ? "bg-green-500 text-white"
                              : isPopular
                                ? "gradient-primary text-primary-foreground"
                                : `border-2 ${pkgStyle.borderColor} bg-secondary/50`
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {isInCart ? (
                            <span className="flex items-center justify-center gap-2">
                              <Check className="w-5 h-5" /> Aggiunto
                            </span>
                          ) : (
                            "Acquista"
                          )}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>

                {packages.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground">
                    <p>Nessun pacchetto disponibile al momento.</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {/* Skins Tab */}
          {!isLoading && activeTab === "skins" && (
            <motion.section 
              key="skins"
              className="py-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="container mx-auto px-4">
                {/* Filters - Only Rarity */}
                <motion.div 
                  className="flex flex-wrap gap-2 justify-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-sm text-muted-foreground font-body self-center mr-2">Rarità:</span>
                  {rarities.map((rarity) => (
                    <motion.button
                      key={rarity}
                      onClick={() => setSelectedRarity(rarity)}
                      className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                        selectedRarity === rarity
                          ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                          : "bg-card/50 border border-border hover:border-accent/50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {rarity}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Skins Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredSkins.map((skin, index) => {
                    const RarityIcon = rarityIcons[skin.rarity] || Star;
                    const isInCart = cart.includes(skin.id);

                    return (
                      <motion.div
                        key={skin.id}
                        className={`relative p-4 rounded-xl border-2 bg-card/50 backdrop-blur-sm cursor-pointer overflow-hidden
                          ${isInCart ? "ring-2 ring-green-500/50 border-green-500/50" : "border-border"}
                          hover:border-primary/50 transition-colors group`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => {
                          setSelectedSkin(skin);
                          setCurrentImageIndex(0);
                        }}
                      >
                        {/* Popular Badge */}
                        {skin.is_popular && (
                          <motion.div 
                            className="absolute top-2 right-2 z-10"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center shadow-lg shadow-accent/50">
                              <Zap className="w-4 h-4 text-accent-foreground" />
                            </div>
                          </motion.div>
                        )}

                        {/* Multiple images indicator */}
                        {skin.images && skin.images.length > 1 && (
                          <div className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium">
                            {skin.images.length} foto
                          </div>
                        )}

                        {/* Skin Preview */}
                        <div className="relative aspect-[3/4] mb-3 flex items-center justify-center bg-gradient-to-b from-primary/10 to-transparent rounded-lg overflow-hidden">
                          <motion.img
                            src={skin.image_url || bodyBase}
                            alt={skin.name}
                            className="h-full object-contain"
                            style={{ imageRendering: 'pixelated' }}
                            whileHover={{ scale: 1.15 }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = bodyBase;
                            }}
                          />
                        </div>

                        {/* Info */}
                        <h3 className="font-display text-sm font-bold mb-1 truncate">{skin.name}</h3>

                        {/* Rarity Badge */}
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border mb-2 ${rarityColors[skin.rarity]}`}>
                          <RarityIcon className="w-3 h-3" />
                          {skin.rarity}
                        </div>

                        {/* Price & Add to Cart */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display font-bold text-accent">{skin.price.toFixed(2)}€</span>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCart(skin.id);
                            }}
                            className={`p-2 rounded-lg transition-all ${
                              isInCart
                                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                                : "bg-primary/20 text-primary hover:bg-primary/30"
                            }`}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                          >
                            {isInCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredSkins.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground">
                    <p>Nessuna skin trovata con i filtri selezionati.</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Cart Summary */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-primary bg-card/95 backdrop-blur-xl shadow-2xl glow-primary">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold">{cart.length} articoli</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <span className="font-display font-bold text-accent text-lg">{totalPrice.toFixed(2)}€</span>
                <motion.button
                  className="px-6 py-2 rounded-lg gradient-primary font-display font-bold text-primary-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Acquista
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skin Detail Modal */}
        <AnimatePresence>
          {selectedSkin && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkin(null)}
            >
              <motion.div
                className="w-full max-w-2xl bg-card border-2 border-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedSkin(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    {/* Main image */}
                    <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent rounded-xl overflow-hidden flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={
                            selectedSkin.images && selectedSkin.images.length > 0
                              ? selectedSkin.images[currentImageIndex]
                              : selectedSkin.image_url || bodyBase
                          }
                          alt={selectedSkin.name}
                          className="max-h-full max-w-full object-contain"
                          style={{ imageRendering: 'pixelated' }}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = bodyBase;
                          }}
                        />
                      </AnimatePresence>

                      {/* Navigation arrows */}
                      {selectedSkin.images && selectedSkin.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? selectedSkin.images!.length - 1 : prev - 1
                            )}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === selectedSkin.images!.length - 1 ? 0 : prev + 1
                            )}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {selectedSkin.images && selectedSkin.images.length > 1 && (
                      <div className="flex gap-2 justify-center flex-wrap">
                        {selectedSkin.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === index
                                ? "border-primary ring-2 ring-primary/30"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${selectedSkin.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-bold">{selectedSkin.name}</h2>
                    
                    {/* Rarity */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${rarityColors[selectedSkin.rarity]}`}>
                      {(() => {
                        const RarityIcon = rarityIcons[selectedSkin.rarity] || Star;
                        return <RarityIcon className="w-4 h-4" />;
                      })()}
                      {selectedSkin.rarity}
                    </div>

                    {/* Price */}
                    <div className="text-3xl font-display font-bold text-accent">
                      {selectedSkin.price.toFixed(2)}€
                    </div>

                    {/* Add to cart */}
                    <motion.button
                      onClick={() => {
                        toggleCart(selectedSkin.id);
                      }}
                      className={`w-full py-3 rounded-xl font-display font-bold flex items-center justify-center gap-2 transition-all ${
                        cart.includes(selectedSkin.id)
                          ? "bg-green-500 text-white"
                          : "gradient-primary text-primary-foreground"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {cart.includes(selectedSkin.id) ? (
                        <>
                          <Check className="w-5 h-5" />
                          Nel Carrello
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Aggiungi al Carrello
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
