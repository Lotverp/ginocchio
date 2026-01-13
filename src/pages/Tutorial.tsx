import { motion } from "framer-motion";
import { Play, Clock, Eye, ChevronRight, Monitor, Gamepad2, ExternalLink } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tutorials = [
  {
    id: 1,
    title: "Come Installare Prominence II - TLauncher",
    description: "Guida completa per installare la modpack su TLauncher (account cracked)",
    duration: "8:32",
    views: "12.4K",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    category: "Cracked",
    difficulty: "Facile",
    featured: true,
  },
  {
    id: 2,
    title: "Installazione Premium - CurseForge",
    description: "Come installare la modpack con CurseForge per account Premium",
    duration: "6:15",
    views: "8.7K",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f76e7?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    category: "Premium",
    difficulty: "Facile",
    featured: true,
  },
  {
    id: 3,
    title: "Configurazione RAM Ottimale",
    description: "Impara a configurare la RAM per prestazioni ottimali",
    duration: "4:45",
    views: "5.2K",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    category: "Configurazione",
    difficulty: "Medio",
    featured: false,
  },
  {
    id: 4,
    title: "Primi Passi nel Server",
    description: "Cosa fare quando entri per la prima volta nel server",
    duration: "12:20",
    views: "15.8K",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example4",
    category: "Gameplay",
    difficulty: "Facile",
    featured: true,
  },
  {
    id: 5,
    title: "Sistema di Classi Spiegato",
    description: "Scopri tutte le 8 classi e quale scegliere per il tuo stile di gioco",
    duration: "18:45",
    views: "9.3K",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example5",
    category: "Gameplay",
    difficulty: "Medio",
    featured: false,
  },
  {
    id: 6,
    title: "Guida al Sistema Magico",
    description: "Come funziona la magia in Prominence II e come levellarla",
    duration: "15:30",
    views: "7.1K",
    thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example6",
    category: "Gameplay",
    difficulty: "Avanzato",
    featured: false,
  },
  {
    id: 7,
    title: "Prism Launcher - Setup Completo",
    description: "Installazione dettagliata con Prism Launcher",
    duration: "10:15",
    views: "4.5K",
    thumbnail: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example7",
    category: "Premium",
    difficulty: "Medio",
    featured: false,
  },
  {
    id: 8,
    title: "Risolvere Errori Comuni",
    description: "Soluzioni ai problemi più frequenti durante l'installazione",
    duration: "7:50",
    views: "11.2K",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=360&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example8",
    category: "Troubleshooting",
    difficulty: "Facile",
    featured: false,
  },
];

const categories = ["Tutti", "Cracked", "Premium", "Configurazione", "Gameplay", "Troubleshooting"];
const difficulties = ["Tutti", "Facile", "Medio", "Avanzato"];

const difficultyColors: Record<string, string> = {
  Facile: "text-green-400 bg-green-500/20",
  Medio: "text-yellow-400 bg-yellow-500/20",
  Avanzato: "text-red-400 bg-red-500/20",
};

const TutorialPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tutti");
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const filteredTutorials = tutorials.filter((tut) => {
    const categoryMatch = selectedCategory === "Tutti" || tut.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "Tutti" || tut.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const featuredTutorials = tutorials.filter((t) => t.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <motion.div
            className="absolute top-20 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-body font-medium mb-4">
                🎬 VIDEO TUTORIAL
              </span>
              <h1 className="font-minecraft text-2xl md:text-4xl mb-6">
                Impara con i <span className="text-gradient-gold">Tutorial</span>
              </h1>
              <p className="text-base text-muted-foreground mb-8 font-body">
                Video guide dettagliate per installare la modpack, configurare il client 
                e diventare un pro player su Prominence II!
              </p>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="#cracked"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-card/50 hover:border-primary/50 transition-all font-display"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Monitor className="w-5 h-5 text-primary" />
                  Guida TLauncher
                </motion.a>
                <motion.a
                  href="#premium"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-card/50 hover:border-accent/50 transition-all font-display"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Gamepad2 className="w-5 h-5 text-accent" />
                  Guida Premium
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Videos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-minecraft text-xl md:text-2xl text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Video <span className="text-gradient-primary">Consigliati</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTutorials.slice(0, 3).map((video, index) => (
                <motion.a
                  key={video.id}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredVideo === video.id ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center z-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredVideo === video.id ? 1 : 0 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center glow-primary"
                        animate={{ scale: hoveredVideo === video.id ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                      </motion.div>
                    </motion.div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-background/90 text-xs font-body font-medium">
                      {video.duration}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-primary/90 text-xs font-body font-medium text-primary-foreground">
                      {video.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative z-20">
                    <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {video.views}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${difficultyColors[video.difficulty]}`}>
                          {video.difficulty}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground font-body self-center mr-2">Categoria:</span>
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/50 border border-border hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground font-body self-center mr-2">Difficoltà:</span>
                {difficulties.map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                      selectedDifficulty === diff
                        ? "bg-accent text-accent-foreground"
                        : "bg-card/50 border border-border hover:border-accent/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {diff}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Tutorials Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-minecraft text-lg md:text-xl mb-8 text-center">
              Tutti i <span className="text-gradient-gold">Tutorial</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTutorials.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-background/90 text-xs font-body">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 relative z-20">
                    <h3 className="font-display text-sm font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${difficultyColors[video.difficulty]}`}>
                        {video.difficulty}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground font-body">Nessun tutorial trovato con questi filtri.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center p-8 rounded-2xl border border-border bg-card/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-minecraft text-lg mb-4">Hai bisogno di aiuto?</h3>
              <p className="text-muted-foreground font-body mb-6">
                Se hai problemi o domande, il nostro staff è sempre disponibile su Discord!
              </p>
              <motion.a
                href="https://discord.gg/tuoserver"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                Unisciti al Discord <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialPage;