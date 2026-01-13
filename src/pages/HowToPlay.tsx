import { motion } from "framer-motion";
import { 
  Download, Settings, Gamepad2, CheckCircle2, ExternalLink, 
  Monitor, HardDrive, Cpu, MemoryStick, AlertCircle, Copy
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowToPlay = () => {
  const [copied, setCopied] = useState(false);
  const serverIP = "play.tuoserver.it";

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const requirements = [
    { icon: Cpu, label: "CPU", min: "Intel i5 / Ryzen 5", rec: "Intel i7 / Ryzen 7" },
    { icon: MemoryStick, label: "RAM", min: "8 GB (6 allocati)", rec: "16 GB (8 allocati)" },
    { icon: HardDrive, label: "Spazio", min: "15 GB liberi", rec: "25 GB SSD" },
    { icon: Monitor, label: "GPU", min: "GTX 1050 / RX 560", rec: "GTX 1660 / RX 5600" },
  ];

  const steps = [
    {
      number: "01",
      title: "Scarica un Launcher Mod",
      description: "Per giocare a Prominence II hai bisogno di un launcher che supporti le modpack. Ti consigliamo una di queste opzioni:",
      options: [
        {
          name: "CurseForge",
          description: "Il più semplice da usare. Scarica, cerca la modpack e gioca!",
          url: "https://www.curseforge.com/download/app",
          recommended: true,
        },
        {
          name: "Prism Launcher",
          description: "Leggero e open source. Perfetto per PC meno potenti.",
          url: "https://prismlauncher.org/download/",
          recommended: false,
        },
        {
          name: "ATLauncher",
          description: "Alternativa valida con molte funzionalità.",
          url: "https://atlauncher.com/downloads",
          recommended: false,
        },
      ],
    },
    {
      number: "02",
      title: "Installa Prominence II RPG",
      description: "Una volta installato il launcher, cerca e installa la modpack:",
      substeps: [
        "Apri il launcher che hai scaricato",
        "Vai nella sezione 'Browse' o 'Cerca Modpack'",
        "Cerca 'Prominence II RPG'",
        "Clicca su 'Install' o 'Installa'",
        "Attendi il download (circa 15-30 minuti)",
        "La modpack si configurerà automaticamente!",
      ],
    },
    {
      number: "03",
      title: "Configura la RAM",
      description: "Prominence II richiede più RAM del Minecraft vanilla. Ecco come allocarla:",
      substeps: [
        "Vai nelle impostazioni del launcher",
        "Cerca 'Java Settings' o 'Impostazioni Java'",
        "Imposta la RAM allocata a 6-8 GB",
        "Se hai 8 GB di RAM totale, alloca 6 GB",
        "Se hai 16 GB o più, alloca 8 GB",
      ],
      warning: "Non allocare più dell'80% della tua RAM totale!",
    },
    {
      number: "04",
      title: "Connettiti al Server",
      description: "Ora puoi finalmente connetterti e iniziare a giocare!",
      substeps: [
        "Avvia la modpack Prominence II",
        "Aspetta il caricamento (può richiedere qualche minuto)",
        "Clicca su 'Multiplayer'",
        "Clicca su 'Add Server' o 'Aggiungi Server'",
        "Inserisci il nostro IP: play.tuoserver.it",
        "Clicca 'Done' e poi unisciti al server!",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-4">
                📖 GUIDA COMPLETA
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Come <span className="text-gradient-primary">Iniziare</span> a Giocare
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Segui questa guida passo-passo e sarai online in meno di 30 minuti. 
                Sia che tu abbia un account Premium o Cracked, potrai giocare senza problemi!
              </p>
              
              {/* Quick IP Copy */}
              <motion.button
                onClick={copyIP}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-accent/50 bg-accent/10 hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-muted-foreground">IP Server:</span>
                <span className="font-mono text-xl text-accent font-bold">{serverIP}</span>
                <Copy className="w-5 h-5 text-accent" />
              </motion.button>
              {copied && <p className="text-green-500 text-sm mt-2">✓ IP copiato!</p>}
            </motion.div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold mb-4">Requisiti di Sistema</h2>
              <p className="text-muted-foreground">Assicurati che il tuo PC soddisfi questi requisiti per un'esperienza ottimale.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <req.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-bold text-lg mb-3">{req.label}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Minimo: </span>
                      <span className="text-foreground">{req.min}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Consigliato: </span>
                      <span className="text-accent">{req.rec}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="mb-12 last:mb-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center glow-primary flex-shrink-0">
                      <span className="font-display text-2xl font-bold text-primary-foreground">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="ml-20">
                    {/* Options (for step 1) */}
                    {step.options && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {step.options.map((option, i) => (
                          <a
                            key={i}
                            href={option.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 rounded-xl border bg-card/50 hover:bg-card transition-all group ${
                              option.recommended ? "border-primary glow-primary" : "border-border hover:border-primary/50"
                            }`}
                          >
                            {option.recommended && (
                              <span className="text-xs text-primary font-medium mb-2 block">⭐ Consigliato</span>
                            )}
                            <div className="flex items-center gap-2 mb-2">
                              <Download className="w-5 h-5 text-primary" />
                              <span className="font-display font-semibold">{option.name}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                            </div>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Substeps */}
                    {step.substeps && (
                      <div className="bg-card/50 rounded-xl border border-border p-6">
                        <ul className="space-y-3">
                          {step.substeps.map((substep, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">{i + 1}</span>
                              </div>
                              <span className="text-foreground/80">{substep}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {step.warning && (
                          <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-yellow-200">{step.warning}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-2xl mx-auto text-center p-8 rounded-2xl border border-border bg-card/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-2xl font-bold mb-4">Hai bisogno di aiuto?</h3>
              <p className="text-muted-foreground mb-6">
                Se hai problemi o domande, il nostro staff è sempre disponibile su Discord per aiutarti!
              </p>
              <a
                href="https://discord.gg/tuoserver"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero inline-flex items-center gap-2"
              >
                Unisciti al Discord <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowToPlay;