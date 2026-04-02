import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero({ data }) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-ink text-parchment">
      {/* Dark background overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink"></div>

      <div className="z-10 text-center max-w-4xl px-6 relative">
        <motion.h1 
          className="text-5xl md:text-7xl font-serif text-gold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {data.title}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-parchment/90 font-sans leading-relaxed shadow-ink"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          {data.subtitle}
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-10 h-10 text-gold opacity-80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
