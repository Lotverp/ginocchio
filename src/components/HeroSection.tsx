import { Copy, ChevronDown, Users, Gamepad2, Clock, Sword, Sparkles, Shield, Wand2, Crown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useServerSettings } from "@/hooks/useServerSettings";
import VoxelDragons from "./VoxelDragons";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [playersOnline] = useState(Math.floor(Math.random() * 50) + 30);
  const { serverAddress } = useServerSettings();

  const copyIP = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Floating particles with more variety
  const particles = [...Array(50)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
    type: Math.random() > 0.6 ? "sparkle" : "orb",
  }));

  // Feature highlights
  const features = [
    { icon: Sword, label: "Boss Epici", color: "text-red-400" },
    { icon: Wand2, label: "Magie Potenti", color: "text-purple-400" },
    { icon: Shield, label: "PvP Arena", color: "text-blue-400" },
    { icon: Crown, label: "Ranghi Unici", color: "text-amber-400" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      {/* Pixel overlay */}
      <div className="absolute inset-0 pixel-overlay opacity-20" />
      
      {/* STRONGER Dark Overlay for better text visibility */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-background/40 to-accent/30" />
      
      {/* Extra dark layer behind title area */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-background/50 to-background/70" />
      
      {/* Voxel Dragons Animation */}
      <VoxelDragons dragonCount={4} />
      
      {/* Animated magical particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.type === "sparkle" 
                ? "bg-accent" 
                : "bg-primary/70"
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              boxShadow: particle.type === "sparkle" 
                ? "0 0 10px hsl(40 90% 50% / 0.8)" 
                : "0 0 15px hsl(280 80% 60% / 0.6)",
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-15, 15, -15],
              opacity: [0.3, 1, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Live Stats Bar */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { icon: <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />, text: "Server Online", color: "border-green-500/50 bg-green-500/10" },
              { icon: <Users className="w-4 h-4 text-primary" />, text: `${playersOnline} Giocatori`, color: "" },
              { icon: <Gamepad2 className="w-4 h-4 text-accent" />, text: "1.20.1", color: "" },
              { icon: <Clock className="w-4 h-4 text-emerald-400" />, text: "Premium & Cracked", color: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 backdrop-blur-md border border-border ${stat.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {stat.icon}
                <span className="text-sm font-body font-medium">{stat.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Main Title with ENHANCED visibility */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            {/* Title background glow */}
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 -m-8 rounded-3xl blur-3xl"
                style={{ background: "radial-gradient(ellipse, hsl(280 80% 50% / 0.4), transparent 70%)" }}
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.h1 
                className="font-minecraft text-5xl md:text-7xl lg:text-8xl mb-2 tracking-wider relative"
                style={{
                  WebkitTextStroke: "2px hsl(280 60% 30%)",
                  paintOrder: "stroke fill",
                }}
                animate={{ 
                  textShadow: [
                    "0 0 40px hsl(280 80% 60% / 0.8), 0 4px 0 hsl(280 60% 20%), 0 8px 20px rgba(0,0,0,0.8)",
                    "0 0 80px hsl(280 80% 60% / 1), 0 4px 0 hsl(280 60% 20%), 0 8px 20px rgba(0,0,0,0.8)",
                    "0 0 40px hsl(280 80% 60% / 0.8), 0 4px 0 hsl(280 60% 20%), 0 8px 20px rgba(0,0,0,0.8)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-gradient-primary drop-shadow-2xl">
                  PROMINENCE
                </span>
              </motion.h1>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div 
                className="h-[4px] w-24 md:w-48 bg-gradient-to-r from-transparent via-primary to-accent rounded-full shadow-lg shadow-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.span 
                className="font-minecraft text-4xl md:text-6xl text-accent drop-shadow-lg relative"
                initial={{ opacity: 0, rotate: -10, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
                style={{ 
                  textShadow: "0 0 30px hsl(40 90% 50% / 0.9), 0 4px 0 hsl(40 70% 30%), 0 8px 15px rgba(0,0,0,0.7)",
                  WebkitTextStroke: "1px hsl(40 70% 30%)",
                }}
              >
                II
              </motion.span>
              <motion.div 
                className="h-[4px] w-24 md:w-48 bg-gradient-to-l from-transparent via-primary to-accent rounded-full shadow-lg shadow-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </div>
            <motion.p 
              className="font-display text-2xl md:text-3xl text-foreground mb-2 tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              ITALIAN SERVER
            </motion.p>
          </motion.div>
          
          {/* Subtitle with better styling */}
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-body leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%),_0_4px_20px_rgb(0_0_0_/_60%)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            Entra nel <span className="text-primary font-bold">mondo fantasy più epico</span> di Minecraft. 
            Combatti boss leggendari, impara magie ancestrali, esplora dungeon misteriosi 
            e unisciti a una <span className="text-accent font-bold">community incredibile</span>.
          </motion.p>

          {/* Feature Pills */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 backdrop-blur-sm border border-border shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, borderColor: "hsl(280 80% 60% / 0.5)" }}
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-sm font-body font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Server IP - Enhanced Minecraft style button */}
          <motion.div 
            className="flex flex-col items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              onClick={copyIP}
              className="group relative"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Minecraft button style with glow */}
              <div className="relative px-10 py-5 bg-gradient-to-b from-secondary to-secondary/80 border-4 border-border rounded-lg
                before:absolute before:inset-0 before:border-t-2 before:border-l-2 before:border-foreground/10 before:rounded-lg
                after:absolute after:inset-0 after:border-b-2 after:border-r-2 after:border-background/30 after:rounded-lg
                hover:from-secondary/90 hover:to-secondary/70 transition-all duration-300
                shadow-lg shadow-primary/20 hover:shadow-primary/40">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm font-body uppercase tracking-wider">IP Server:</span>
                  <span className="font-pixel text-2xl md:text-3xl text-accent font-bold tracking-wider">
                    {serverAddress}
                  </span>
                  <motion.div
                    animate={copied ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Copy className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>
              </div>
              
              {/* Enhanced glow effect */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg"
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsl(280 80% 60% / 0)",
                    "0 0 40px 15px hsl(280 80% 60% / 0.4)",
                    "0 0 0 0 hsl(280 80% 60% / 0)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.button>
            
            <AnimatedCopiedMessage copied={copied} />
          </motion.div>
          
          {/* CTA Buttons - Enhanced */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <motion.a 
              href="/come-giocare" 
              className="btn-hero group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 font-display text-lg">
                🎮 Come Iniziare
              </span>
            </motion.a>
            <motion.a 
              href="/shop" 
              className="btn-gold font-display text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💎 Visita lo Shop
            </motion.a>
            <motion.a 
              href="/la-mod" 
              className="px-6 py-3 font-display font-semibold text-lg rounded-lg border-2 border-border bg-secondary/50 
                hover:bg-secondary hover:border-primary/50 transition-all duration-300
                shadow-lg hover:shadow-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📖 Scopri la Mod
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, delay: 1.5 }
        }}
      >
        <a href="#features" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <span className="text-sm font-body font-medium group-hover:text-primary transition-colors">Scorri per scoprire</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

const AnimatedCopiedMessage = ({ copied }: { copied: boolean }) => (
  <motion.div
    initial={false}
    animate={{ 
      opacity: copied ? 1 : 0,
      y: copied ? 0 : -10,
      scale: copied ? 1 : 0.8,
    }}
    className="flex items-center gap-2 text-sm text-green-400 font-body font-medium bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30"
  >
    <motion.span
      animate={copied ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      ✓
    </motion.span>
    IP copiato negli appunti!
  </motion.div>
);

export default HeroSection;
