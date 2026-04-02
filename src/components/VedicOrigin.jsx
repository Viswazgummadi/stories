import { motion } from 'framer-motion';

export default function VedicOrigin({ data }) {
  return (
    <section className="py-24 px-6 md:px-16 bg-parchment relative overflow-hidden flex justify-center">
      <div className="max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-ink mb-6">{data.title}</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-10 md:p-16 rounded-xl shadow-xl shadow-black/5 border border-terracotta/10 relative"
        >
          <div className="absolute top-6 left-6 text-7xl text-gold/20 font-serif leading-none">“</div>
          
          <p className="text-2xl md:text-3xl font-serif text-ink/90 italic text-center leading-relaxed mb-6 relative z-10">
            {data.quote}
          </p>
          <p className="text-right text-terracotta font-semibold tracking-wide uppercase text-sm mb-12">
            {data.quoteExplanation}
          </p>

          <div className="border-t border-terracotta/20 pt-8">
            <p className="whitespace-pre-wrap text-ink/80 text-lg leading-relaxed font-sans">
              {data.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
