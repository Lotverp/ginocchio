import { motion } from "framer-motion";
import { 
  Sword, Wand2, Map, Scroll, Shield, Sparkles, 
  Mountain, Users, BookOpen, Gem, Crown, Flame,
  ExternalLink, Play
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import previewBoss from "@/assets/preview-boss.jpg";
import previewMagic from "@/assets/preview-magic.jpg";
import previewExploration from "@/assets/preview-exploration.jpg";
import previewDungeon from "@/assets/preview-dungeon.jpg";

const LaModPage = () => {
  const mainFeatures = [
    {
      icon: Sword,
      title: "Combattimento Skill-Based",
      description: "Dimentica il click spam! In Prominence II ogni arma ha combo uniche, puoi schivare, parare e usare abilità speciali. Il sistema di combattimento è profondo e gratificante.",
      color: "text-red-400",
    },
    {
      icon: Wand2,
      title: "Magia Avanzata",
      description: "Oltre 100 spell magiche divise per elementi: Fuoco, Ghiaccio, Fulmine, Terra, Luce e Oscurità. Costruisci il tuo grimorio personalizzato e specializzati nel tuo elemento preferito.",
      color: "text-purple-400",
    },
    {
      icon: Scroll,
      title: "Quest & Storyline",
      description: "Una storia epica ti aspetta! Centinaia di quest con dialoghi, scelte morali e conseguenze. Ogni decisione influenza il mondo e le relazioni con le fazioni.",
      color: "text-blue-400",
    },
    {
      icon: Mountain,
      title: "Nuove Dimensioni",
      description: "Esplora dimensioni uniche oltre l'Overworld. Ogni dimensione ha i suoi boss, loot esclusivo, meccaniche uniche e sfide da superare.",
      color: "text-emerald-400",
    },
    {
      icon: Gem,
      title: "Sistema di Loot",
      description: "Ogni item ha rarità e statistiche uniche. Trova set leggendari con bonus speciali, armi con abilità passive e artefatti mistici con poteri nascosti.",
      color: "text-amber-400",
    },
    {
      icon: Users,
      title: "Classi & Progressione",
      description: "Scegli tra 8 classi uniche: Guerriero, Mago, Ranger, Ladro, Paladino, Necromante, Druido e Bardo. Ogni classe ha skill tree dedicati e stili di gioco diversi.",
      color: "text-cyan-400",
    },
  ];

  const classes = [
    { name: "Guerriero", description: "Tank e DPS melee", icon: Shield, color: "bg-red-500/20 text-red-400" },
    { name: "Mago", description: "Spell caster a distanza", icon: Wand2, color: "bg-purple-500/20 text-purple-400" },
    { name: "Ranger", description: "DPS a distanza e trapper", icon: Map, color: "bg-green-500/20 text-green-400" },
    { name: "Ladro", description: "Burst damage e stealth", icon: Gem, color: "bg-gray-500/20 text-gray-400" },
    { name: "Paladino", description: "Tank e supporto", icon: Crown, color: "bg-yellow-500/20 text-yellow-400" },
    { name: "Necromante", description: "Summoner e debuff", icon: Scroll, color: "bg-violet-500/20 text-violet-400" },
    { name: "Druido", description: "Healer e shapeshifter", icon: Sparkles, color: "bg-emerald-500/20 text-emerald-400" },
    { name: "Bardo", description: "Buffer e utility", icon: BookOpen, color: "bg-pink-500/20 text-pink-400" },
  ];

  const bosses = [
    { name: "Il Dragone Corrotto", difficulty: "★★★★★", reward: "Set Draconico" },
    { name: "Signore dell'Abisso", difficulty: "★★★★☆", reward: "Armi Abissali" },
    { name: "Guardiano del Portale", difficulty: "★★★☆☆", reward: "Cristalli Dimensionali" },
    { name: "Re dei Golem", difficulty: "★★★★☆", reward: "Armatura di Pietra Viva" },
    { name: "Fenice Ancestrale", difficulty: "★★★★★", reward: "Piume di Rinascita" },
  ];

  const galleries = [
    { image: previewBoss, title: "Boss Fight Epiche", description: "Affronta boss devastanti con meccaniche uniche" },
    { image: previewMagic, title: "Sistema Magico", description: "Lancia spell spettacolari e costruisci il tuo build" },
    { image: previewExploration, title: "Mondo Esplorabile", description: "Scopri paesaggi mozzafiato e segreti nascosti" },
    { image: previewDungeon, title: "Dungeon & Loot", description: "Raid dungeon e ottieni equipaggiamento leggendario" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                🎮 LA MODPACK
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient-primary">Prominence II</span> RPG
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Prominence II trasforma Minecraft in un vero e proprio RPG open world. Con oltre 300 mod perfettamente integrate, 
                offre centinaia di ore di contenuti: quest epiche, boss devastanti, magia avanzata, classi uniche e molto altro.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.curseforge.com/minecraft/modpacks/prominence-2-rpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" /> Scarica la Modpack
                </a>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/50 border border-border">
                  <span className="text-muted-foreground text-sm">Versione:</span>
                  <span className="font-mono text-accent font-bold">1.20.1</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Gameplay <span className="text-gradient-gold">Preview</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleries.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Caratteristiche <span className="text-gradient-primary">Principali</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Scopri cosa rende Prominence II la modpack RPG definitiva per Minecraft.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                  <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Classes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Scegli la tua <span className="text-gradient-gold">Classe</span>
              </h2>
              <p className="text-muted-foreground">
                8 classi uniche con skill tree dedicati e stili di gioco completamente diversi.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {classes.map((cls, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl border border-border bg-card/50 text-center hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${cls.color} mx-auto mb-3 flex items-center justify-center`}>
                    <cls.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold">{cls.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cls.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bosses */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gradient-primary">Boss</span> Leggendari
              </h2>
              <p className="text-muted-foreground">
                Affronta boss devastanti e ottieni loot epico. Alcuni richiedono un party intero!
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {bosses.map((boss, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 mb-3 last:mb-0 hover:border-red-500/30 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold">{boss.name}</h3>
                      <span className="text-yellow-400 text-sm">{boss.difficulty}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Reward</span>
                    <p className="text-sm text-accent font-medium">{boss.reward}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-3xl font-bold mb-4">Pronto per l'Avventura?</h3>
              <p className="text-muted-foreground mb-8">
                Unisciti a noi sul server italiano di Prominence II. Community attiva, staff dedicato e tanto divertimento ti aspettano!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/come-giocare" className="btn-hero">
                  🎮 Come Iniziare
                </a>
                <a href="/shop" className="btn-gold">
                  💎 Vai allo Shop
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaModPage;