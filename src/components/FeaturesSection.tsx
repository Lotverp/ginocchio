import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Sword, Users, Shield, Sparkles, Globe, Zap, 
  Heart, Trophy, Gem, Wand2, Mountain, Castle 
} from "lucide-react";

const features = [
  { icon: Sword, title: "Combattimento Avanzato", description: "Sistema di combattimento skill-based con combo, schivate e abilità speciali.", color: "text-red-400", bg: "bg-red-500/10", glow: "shadow-red-500/20" },
  { icon: Wand2, title: "Magia & Incantesimi", description: "Oltre 100 spell magiche divise per elementi. Costruisci il tuo grimorio.", color: "text-purple-400", bg: "bg-purple-500/10", glow: "shadow-purple-500/20" },
  { icon: Trophy, title: "Progressione RPG", description: "Sistema di livelli, classi, skill tree e attributi personalizzabili.", color: "text-yellow-400", bg: "bg-yellow-500/10", glow: "shadow-yellow-500/20" },
  { icon: Users, title: "Community Attiva", description: "Centinaia di giocatori attivi, eventi settimanali e staff dedicato.", color: "text-blue-400", bg: "bg-blue-500/10", glow: "shadow-blue-500/20" },
  { icon: Shield, title: "Premium & Cracked", description: "Server accessibile a TUTTI! Sia account premium che non-premium.", color: "text-green-400", bg: "bg-green-500/10", glow: "shadow-green-500/20" },
  { icon: Globe, title: "Nuove Dimensioni", description: "Esplora dimensioni uniche oltre l'Overworld con boss e loot esclusivi.", color: "text-cyan-400", bg: "bg-cyan-500/10", glow: "shadow-cyan-500/20" },
  { icon: Castle, title: "Dungeon Procedurali", description: "Dungeon generati proceduralmente con difficoltà scalabile.", color: "text-orange-400", bg: "bg-orange-500/10", glow: "shadow-orange-500/20" },
  { icon: Mountain, title: "Mondo Esplorabile", description: "Mappa vasta con strutture uniche, villaggi e segreti nascosti.", color: "text-emerald-400", bg: "bg-emerald-500/10", glow: "shadow-emerald-500/20" },
  { icon: Heart, title: "Staff Attivo", description: "Team di moderatori sempre presenti per aiutarti.", color: "text-pink-400", bg: "bg-pink-500/10", glow: "shadow-pink-500/20" },
  { icon: Zap, title: "Zero Lag", description: "Server hostato su hardware di ultima generazione con TPS stabili.", color: "text-amber-400", bg: "bg-amber-500/10", glow: "shadow-amber-500/20" },
  { icon: Gem, title: "Loot Unico", description: "Sistema di rarità con item leggendari e set bonus.", color: "text-violet-400", bg: "bg-violet-500/10", glow: "shadow-violet-500/20" },
  { icon: Sparkles, title: "Eventi Speciali", description: "Eventi stagionali, boss world e competizioni con premi.", color: "text-rose-400", bg: "bg-rose-500/10", glow: "shadow-rose-500/20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Animated background effects */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/10 blur-2xl"
          style={{
            width: 100 + i * 30,
            height: 100 + i * 30,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      <div className="absolute inset-0 pixel-overlay opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with enhanced animation */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-body font-medium mb-4"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(40 90% 50% / 0.5)" }}
          >
            <motion.span 
              className="inline-block mr-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚔️
            </motion.span>
            CARATTERISTICHE
          </motion.span>
          
          <motion.h2 
            className="font-minecraft text-2xl md:text-4xl mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Perché{" "}
            <motion.span 
              className="text-gradient-gold inline-block"
              animate={{ 
                textShadow: [
                  "0 0 10px hsl(40 90% 50% / 0.3)",
                  "0 0 30px hsl(40 90% 50% / 0.6)",
                  "0 0 10px hsl(40 90% 50% / 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sceglierci
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-base max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Non siamo il solito server Minecraft. Offriamo un'esperienza RPG completa.
          </motion.p>
        </motion.div>
        
        {/* Features Grid with staggered animation */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`group relative p-5 rounded-xl border border-border ${feature.bg} backdrop-blur-sm overflow-hidden`}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                borderColor: "hsl(280 80% 60% / 0.5)",
                boxShadow: `0 20px 40px -10px ${feature.glow}`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background shine effect on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                whileHover={{ translateX: "200%" }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Icon with animation */}
              <motion.div 
                className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 relative z-10`}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: [0, -10, 10, 0],
                  boxShadow: `0 0 20px ${feature.glow}`,
                }}
                transition={{ duration: 0.4 }}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </motion.div>
              
              <h3 className="font-display text-lg font-semibold mb-2 relative z-10 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body relative z-10">
                {feature.description}
              </p>
              
              {/* Corner glow on hover */}
              <motion.div 
                className={`absolute -bottom-10 -right-10 w-20 h-20 rounded-full ${feature.bg} blur-xl opacity-0 group-hover:opacity-100`}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
