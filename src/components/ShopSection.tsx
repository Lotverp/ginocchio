import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Gem, Star, Zap, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    name: "Starter",
    price: "4.99€",
    icon: Star,
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    glowColor: "0 0 30px rgba(59, 130, 246, 0.3)",
    bgGradient: "from-blue-500/10 to-transparent",
    popular: false,
    features: [
      "Kit base esclusivo",
      "Titolo [Starter] in chat",
      "Accesso a /kit starter",
      "5 Home extra",
    ],
  },
  {
    name: "VIP",
    price: "9.99€",
    icon: Gem,
    color: "text-primary",
    borderColor: "border-primary/50",
    glowColor: "0 0 40px rgba(168, 85, 247, 0.4)",
    bgGradient: "from-primary/20 to-transparent",
    popular: true,
    features: [
      "Tutto del pacchetto Starter",
      "Kit VIP settimanale",
      "Titolo [VIP] luminoso",
      "15 Home extra",
      "/fly nelle zone safe",
      "Slot riservato",
    ],
  },
  {
    name: "Premium",
    price: "19.99€",
    icon: Crown,
    color: "text-accent",
    borderColor: "border-accent/50",
    glowColor: "0 0 40px rgba(251, 191, 36, 0.4)",
    bgGradient: "from-accent/20 to-transparent",
    popular: false,
    features: [
      "Tutto del pacchetto VIP",
      "Kit Premium giornaliero",
      "Titolo [Premium] animato",
      "Home illimitate",
      "Accesso anticipato update",
      "Canale Discord VIP",
    ],
  },
  {
    name: "Leggenda",
    price: "39.99€",
    icon: Zap,
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    glowColor: "0 0 50px rgba(234, 179, 8, 0.5)",
    bgGradient: "from-yellow-500/20 to-transparent",
    popular: false,
    features: [
      "Tutto del pacchetto Premium",
      "Kit Leggenda esclusivo",
      "Titolo [Leggenda] effetti",
      "Cosmetics unici",
      "Evento privato mensile",
      "Supporto diretto staff",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const ShopSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="shop" className="py-24 relative overflow-hidden">
      {/* Animated background effects */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💎
            </motion.span>
            SHOP
          </motion.span>
          
          <motion.h2 
            className="font-minecraft text-2xl md:text-4xl mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
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
              Pacchetti
            </motion.span>{" "}VIP
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-base max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Supporta il server e ottieni vantaggi esclusivi!
          </motion.p>
        </motion.div>
        
        {/* Packages Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col p-6 rounded-2xl border-2 bg-card/50 backdrop-blur-sm overflow-hidden
                ${pkg.borderColor} group cursor-pointer`}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: pkg.glowColor,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated background gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-t ${pkg.bgGradient} opacity-0 group-hover:opacity-100`}
                transition={{ duration: 0.3 }}
              />
              
              {/* Shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              {/* Popular Badge */}
              {pkg.popular && (
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-xs font-bold text-primary-foreground flex items-center gap-1 z-20"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 15px hsl(280 80% 60% / 0.4)",
                      "0 0 25px hsl(280 80% 60% / 0.6)",
                      "0 0 15px hsl(280 80% 60% / 0.4)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3" /> Più Popolare
                </motion.div>
              )}
              
              {/* Icon & Name */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center ${pkg.color}`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    boxShadow: pkg.glowColor,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <pkg.icon className="w-7 h-7" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
                  <motion.span 
                    className={`text-2xl font-bold ${pkg.color}`}
                    animate={pkg.popular ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {pkg.price}
                  </motion.span>
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-6 flex-grow relative z-10">
                {pkg.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <span className="text-foreground/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Buy Button */}
              <motion.button
                className={`w-full py-3 rounded-xl font-display font-semibold transition-all duration-300 relative z-10 overflow-hidden ${
                  pkg.popular
                    ? "gradient-primary text-primary-foreground"
                    : `border-2 ${pkg.borderColor} bg-secondary/50`
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20 -translate-x-full"
                  whileHover={{ translateX: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">Acquista</span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Note */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.p 
            className="text-muted-foreground text-sm mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💎 I pacchetti sono one-time e validi per sempre. Pagamenti sicuri via PayPal/Stripe.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05, x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Vedi tutti i pacchetti e dettagli 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;
