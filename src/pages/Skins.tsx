import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, ShoppingCart, Sparkles, Crown, Star, Gem, Zap, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import guerrieroOscuro from "@/assets/skins/guerriero-oscuro.png";
import bodyBase from "@/assets/skins/body.png";

interface ShopSkin {
  id: string;
  name: string;
  category: string;
  rarity: string;
  price: number;
  image_url: string | null;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const categories = ["Tutti", "Combat", "Magic", "Nature", "Dark", "Holy", "Stealth", "Basic", "General"];
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

const SkinsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedRarity, setSelectedRarity] = useState("Tutti");
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [skins, setSkins] = useState<ShopSkin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load skins from database
  useEffect(() => {
    loadSkins();
  }, []);

  const loadSkins = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('shop_skins')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading skins:', error);
        return;
      }

      setSkins(data || []);
    } catch (err) {
      console.error('Load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSkins = skins.filter((skin) => {
    const categoryMatch = selectedCategory === "Tutti" || skin.category === selectedCategory;
    const rarityMatch = selectedRarity === "Tutti" || skin.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const toggleCart = (skinId: string) => {
    setCart((prev) =>
      prev.includes(skinId) ? prev.filter((id) => id !== skinId) : [...prev, skinId]
    );
  };

  const totalPrice = cart.reduce((sum, id) => {
    const skin = skins.find((s) => s.id === id);
    return sum + (skin ? skin.price : 0);
  }, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero with floating particles */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          
          {/* Animated background orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20 blur-3xl"
              style={{
                width: 200 + i * 50,
                height: 200 + i * 50,
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ 
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-body font-medium mb-4"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(280 80% 60% / 0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mr-2"
                >
                  👤
                </motion.span>
                SKIN SHOP
              </motion.span>
              
              <motion.h1 
                className="font-minecraft text-2xl md:text-4xl mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                Scegli la tua{" "}
                <motion.span 
                  className="text-gradient-primary inline-block"
                  animate={{ 
                    textShadow: [
                      "0 0 20px hsl(280 80% 60% / 0.5)",
                      "0 0 40px hsl(280 80% 60% / 0.8)",
                      "0 0 20px hsl(280 80% 60% / 0.5)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Skin
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-base text-muted-foreground mb-8 font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Scegli la skin che preferisci e la applicheremo al tuo personaggio!
                Tutte le skin sono esclusive per il nostro server.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filters with animations */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex flex-wrap gap-6 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground font-body self-center mr-2">Categoria:</span>
                {categories.map((cat, index) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card/50 border border-border hover:border-primary/50 hover:bg-primary/10"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.03 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              {/* Rarity Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground font-body self-center mr-2">Rarità:</span>
                {rarities.map((rarity, index) => (
                  <motion.button
                    key={rarity}
                    onClick={() => setSelectedRarity(rarity)}
                    className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                      selectedRarity === rarity
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                        : "bg-card/50 border border-border hover:border-accent/50 hover:bg-accent/10"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.03 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {rarity}
                  </motion.button>
                ))}
              </div>
            </motion.div>
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

        {/* Skins Grid */}
        {!isLoading && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${selectedCategory}-${selectedRarity}`}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {filteredSkins.map((skin) => {
                    const RarityIcon = rarityIcons[skin.rarity] || Star;
                    const isInCart = cart.includes(skin.id);
                    const isSelected = selectedSkin === skin.id;
                    const glowClass = rarityGlowColors[skin.rarity] || "";

                    return (
                      <motion.div
                        key={skin.id}
                        className={`relative p-4 rounded-xl border-2 bg-card/50 backdrop-blur-sm cursor-pointer overflow-hidden
                          ${isSelected ? "border-primary ring-2 ring-primary/30" : "border-border"} 
                          ${isInCart ? "ring-2 ring-green-500/50" : ""}
                          hover:border-primary/50 transition-colors group`}
                        variants={itemVariants}
                        whileHover={{ 
                          y: -12, 
                          scale: 1.03,
                          boxShadow: `0 20px 40px -10px ${skin.rarity === 'Leggendario' ? 'rgba(251, 191, 36, 0.3)' : 
                            skin.rarity === 'Epico' ? 'rgba(168, 85, 247, 0.3)' : 
                            skin.rarity === 'Elite' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
                        }}
                        onClick={() => setSelectedSkin(skin.id)}
                        layout
                      >
                        {/* Background glow effect */}
                        <motion.div 
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/20 to-transparent`}
                        />

                        {/* Popular Badge */}
                        {skin.is_popular && (
                          <motion.div 
                            className="absolute top-2 right-2 z-10"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center shadow-lg shadow-accent/50">
                              <Zap className="w-4 h-4 text-accent-foreground" />
                            </div>
                          </motion.div>
                        )}

                        {/* Skin Preview */}
                        <div className="relative aspect-[3/4] mb-3 flex items-center justify-center bg-gradient-to-b from-primary/10 to-transparent rounded-lg overflow-hidden">
                          <motion.img
                            src={skin.image_url || bodyBase}
                            alt={skin.name}
                            className="h-full object-contain"
                            style={{ imageRendering: 'pixelated' }}
                            whileHover={{ scale: 1.15, rotateY: 20 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = bodyBase;
                            }}
                          />
                          
                          {/* Shine effect on hover */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                          />
                        </div>

                        {/* Info */}
                        <motion.h3 
                          className="font-display text-sm font-bold mb-1 truncate relative z-10"
                          layout
                        >
                          {skin.name}
                        </motion.h3>

                        {/* Rarity Badge */}
                        <motion.div 
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border mb-2 ${rarityColors[skin.rarity]}`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <RarityIcon className="w-3 h-3" />
                          {skin.rarity}
                        </motion.div>

                        {/* Price & Add to Cart */}
                        <div className="flex items-center justify-between mt-2 relative z-10">
                          <motion.span 
                            className="font-display font-bold text-accent"
                            animate={isInCart ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {skin.price.toFixed(2)}€
                          </motion.span>
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
                            whileHover={{ scale: 1.15, rotate: isInCart ? 0 : 10 }}
                            whileTap={{ scale: 0.85 }}
                          >
                            <AnimatePresence mode="wait">
                              {isInCart ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                >
                                  <Check className="w-4 h-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="cart"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {filteredSkins.length === 0 && !isLoading && (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  </motion.div>
                  <p className="text-muted-foreground font-body">Nessuna skin trovata con questi filtri.</p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Cart Summary - Floating */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              className="fixed bottom-6 left-1/2 z-50"
              initial={{ opacity: 0, y: 100, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 100, x: "-50%" }}
            >
              <motion.div 
                className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-primary bg-card/95 backdrop-blur-xl shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 0 30px hsl(280 80% 60% / 0.3)",
                    "0 0 50px hsl(280 80% 60% / 0.5)",
                    "0 0 30px hsl(280 80% 60% / 0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold">{cart.length} skin</span>
                </motion.div>
                <div className="h-6 w-px bg-border" />
                <span className="font-display font-bold text-accent text-lg">{totalPrice.toFixed(2)}€</span>
                <motion.button
                  className="px-6 py-2 rounded-lg gradient-primary font-display font-bold text-primary-foreground"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(280 80% 60% / 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Acquista
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Skin Detail */}
        <AnimatePresence>
          {selectedSkin && (
            <motion.section
              className="py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                  {(() => {
                    const skin = skins.find((s) => s.id === selectedSkin);
                    if (!skin) return null;
                    const RarityIcon = rarityIcons[skin.rarity] || Star;
                    return (
                      <motion.div
                        className="p-8 rounded-2xl border-2 border-primary bg-card/50 backdrop-blur-md"
                        layoutId={`skin-detail-${skin.id}`}
                        animate={{ 
                          boxShadow: [
                            "0 0 30px hsl(280 80% 60% / 0.2)",
                            "0 0 60px hsl(280 80% 60% / 0.4)",
                            "0 0 30px hsl(280 80% 60% / 0.2)",
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <motion.div
                            className="w-40 h-60 flex items-center justify-center bg-gradient-to-b from-primary/20 to-transparent rounded-xl overflow-hidden"
                            animate={{ rotateY: [0, 15, 0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <img
                              src={skin.image_url || bodyBase}
                              alt={skin.name}
                              className="h-full object-contain"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          </motion.div>
                          <div className="flex-1 text-center md:text-left">
                            <motion.div 
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border mb-3 ${rarityColors[skin.rarity]}`}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <RarityIcon className="w-4 h-4" />
                              {skin.rarity}
                            </motion.div>
                            <h2 className="font-minecraft text-xl md:text-2xl mb-2">{skin.name}</h2>
                            <p className="text-muted-foreground font-body mb-4">
                              Categoria: <span className="text-foreground">{skin.category}</span>
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                              <motion.span 
                                className="font-display text-3xl font-bold text-accent"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                {skin.price.toFixed(2)}€
                              </motion.span>
                              <motion.button
                                onClick={() => toggleCart(skin.id)}
                                className={`px-6 py-3 rounded-lg font-display font-bold transition-colors ${
                                  cart.includes(skin.id)
                                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                                    : "gradient-primary text-primary-foreground"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {cart.includes(skin.id) ? "✓ Nel Carrello" : "Aggiungi al Carrello"}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default SkinsPage;
