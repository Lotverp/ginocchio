import { motion } from "framer-motion";
import { Download, Settings, Gamepad2, Users, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Scarica il Launcher",
    description: "Scarica CurseForge o Prism Launcher. Sono gratuiti e facili da usare. Consigliamo CurseForge per principianti.",
    details: [
      "CurseForge: più semplice, download automatico",
      "Prism Launcher: più leggero, per PC meno potenti",
      "Minecraft Java Edition 1.20.1 richiesto",
    ],
  },
  {
    number: "02",
    icon: Settings,
    title: "Installa Prominence II",
    description: "Cerca 'Prominence II RPG' nel launcher e installalo con un click. La modpack si configura automaticamente.",
    details: [
      "RAM consigliata: 6-8 GB allocati",
      "Tempo download: ~15-30 minuti",
      "Mod totali: 300+ perfettamente integrate",
    ],
  },
  {
    number: "03",
    icon: Gamepad2,
    title: "Connettiti al Server",
    description: "Avvia la modpack, vai su Multiplayer, aggiungi il server con il nostro IP e inizia a giocare!",
    details: [
      "IP: play.tuoserver.it",
      "Porta: 25565 (default)",
      "Funziona sia Premium che Cracked!",
    ],
  },
  {
    number: "04",
    icon: Users,
    title: "Unisciti alla Community",
    description: "Entra nel nostro Discord per trovare compagni di avventura, partecipare a eventi e ricevere supporto.",
    details: [
      "Canali dedicati per ogni aspetto del gioco",
      "Staff sempre disponibile",
      "Eventi e giveaway settimanali",
    ],
  },
];

const HowToPlaySection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-body font-medium mb-4">
            📖 GUIDA RAPIDA
          </span>
          <h2 className="font-minecraft text-2xl md:text-4xl mb-4">
            Come <span className="text-gradient-primary">Iniziare</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto font-body">
            Iniziare a giocare è semplicissimo! Segui questi 4 step e sarai online in meno di 30 minuti.
          </p>
        </motion.div>
        
        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex gap-6 mb-8 last:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-border mt-4" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-primary">{step.number}</span>
                  <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                {/* Details */}
                <div className="bg-card/50 rounded-xl border border-border p-4">
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/come-giocare"
            className="inline-flex items-center gap-2 btn-hero"
          >
            Guida Completa <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToPlaySection;