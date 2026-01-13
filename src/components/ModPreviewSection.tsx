import { motion } from "framer-motion";
import { Sword, Sparkles, Map, Scroll, Play, Wand2, Shield, Users, Gem } from "lucide-react";
import { useState } from "react";
import previewBoss from "@/assets/preview-boss.jpg";
import previewMagic from "@/assets/preview-magic.jpg";
import previewExploration from "@/assets/preview-exploration.jpg";
import previewDungeon from "@/assets/preview-dungeon.jpg";
import previewCrafting from "@/assets/preview-crafting.jpg";
import previewMounts from "@/assets/preview-mounts.jpg";
import previewTalents from "@/assets/preview-talents.jpg";
import previewPvp from "@/assets/preview-pvp.jpg";

const previews = [
  {
    title: "Boss Epici",
    description: "Affronta boss devastanti con meccaniche uniche. Ogni boss richiede strategia, teamwork e il giusto equipaggiamento.",
    image: previewBoss,
    icon: Sword,
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "hover:border-red-500/50",
    accentColor: "text-red-400",
  },
  {
    title: "Sistema Magico",
    description: "Impara oltre 100 spell diverse! Scegli il tuo elemento, costruisci il tuo skill tree e diventa il mago più potente.",
    image: previewMagic,
    icon: Sparkles,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "hover:border-purple-500/50",
    accentColor: "text-purple-400",
  },
  {
    title: "Esplorazione",
    description: "Scopri nuove dimensioni, isole volanti, città antiche e segreti nascosti. Ogni angolo nasconde tesori.",
    image: previewExploration,
    icon: Map,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "hover:border-cyan-500/50",
    accentColor: "text-cyan-400",
  },
  {
    title: "Dungeon & Loot",
    description: "Affronta dungeon procedurali con difficoltà crescente. Più vai in profondità, migliore sarà il loot!",
    image: previewDungeon,
    icon: Scroll,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "hover:border-amber-500/50",
    accentColor: "text-amber-400",
  },
  {
    title: "Crafting Avanzato",
    description: "Sistema di crafting complesso con incantamenti, rune e forge magiche per creare armi leggendarie.",
    image: previewCrafting,
    icon: Wand2,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "hover:border-emerald-500/50",
    accentColor: "text-emerald-400",
  },
  {
    title: "Cavalcature & Mount",
    description: "Cavalca draghi, grifoni e creature mitiche! Esplora il mondo dall'alto con mount esclusivi.",
    image: previewMounts,
    icon: Shield,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "hover:border-indigo-500/50",
    accentColor: "text-indigo-400",
  },
  {
    title: "Talent Tree",
    description: "Sistema di talenti profondo con oltre 50 abilità da sbloccare. Crea la build perfetta per il tuo stile.",
    image: previewTalents,
    icon: Gem,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "hover:border-teal-500/50",
    accentColor: "text-teal-400",
  },
  {
    title: "PvP Arena",
    description: "Combatti in arene competitive contro altri giocatori. Classifiche, tornei e premi esclusivi!",
    image: previewPvp,
    icon: Users,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "hover:border-rose-500/50",
    accentColor: "text-rose-400",
  },
];

const ModPreviewSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute inset-0 pixel-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-body font-medium mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            🎮 GAMEPLAY PREVIEW
          </motion.span>
          <h2 className="font-minecraft text-2xl md:text-4xl mb-4">
            Cosa ti <span className="text-gradient-primary">Aspetta</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-3xl mx-auto font-body">
            Prominence II è la modpack RPG definitiva per Minecraft. Centinaia di ore di contenuti, 
            quest epiche, boss devastanti e un sistema di progressione incredibile.
          </p>
        </motion.div>
        
        {/* Preview Grid - 4 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {previews.map((preview, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border-2 border-border bg-card ${preview.borderColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 30, rotateY: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: "spring" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={preview.image}
                  alt={preview.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${preview.color} to-transparent opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Icon Badge */}
                <motion.div 
                  className="absolute top-3 left-3 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary"
                  animate={{ 
                    rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <preview.icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>

                {/* Play button on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border-2 border-primary"
                    animate={{ scale: hoveredIndex === index ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Play className={`w-6 h-6 ${preview.accentColor} fill-current ml-0.5`} />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-lg font-bold mb-2">{preview.title}</h3>
                <p className="text-muted-foreground font-body text-sm line-clamp-2">{preview.description}</p>
              </div>
              
              {/* Hover glow effect */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${preview.color} opacity-30`} />
              </motion.div>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: "300+", label: "Mod Integrate" },
            { value: "50+", label: "Boss Unici" },
            { value: "100+", label: "Spell Magiche" },
            { value: "∞", label: "Avventure" },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="font-minecraft text-2xl md:text-3xl text-gradient-primary mb-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground text-sm font-body">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModPreviewSection;
