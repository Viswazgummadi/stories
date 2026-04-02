import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 50, damping: 20 }
  }
};

export default function StoryCard({ title, image, storyText, democraticLesson }) {
  const images = Array.isArray(image) ? image : [image];
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % images.length);
    }, 4000); // 4 seconds auto-slideshow
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div 
      variants={cardVariants}
      className="bg-white rounded-xl shadow-xl shadow-black/5 overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 group"
    >
      {/* Top: Image Slideshow */}
      <div className="relative h-64 overflow-hidden bg-ink/10">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={title} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-105 ${idx === currentImg ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
            loading="lazy"
          />
        ))}
        {/* Slideshow Progress Dots */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-20 flex gap-1.5 justify-end">
            {images.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 bg-white shadow-sm ${idx === currentImg ? 'w-4 opacity-100' : 'w-1.5 opacity-40'}`} />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-4 left-6 right-6 z-20 pointer-events-none">
          <h3 className="text-2xl font-serif font-bold text-parchment drop-shadow-md leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Body: Story Text */}
      <div className="p-6 md:p-8 flex-grow flex flex-col gap-6">
        <p className="text-ink/80 font-sans leading-relaxed whitespace-pre-wrap">
          {storyText}
        </p>

        {/* The Highlight: Law Connection */}
        <div className="mt-auto pt-6 border-t border-parchment">
          <div className="bg-yellow-50/80 p-5 rounded-r-lg border-l-4 border-gold text-ink relative shadow-sm">
            <div className="flex items-center gap-2 mb-2 font-serif text-terracotta font-semibold">
              <span className="text-xl">⚖️</span> 
              <h4>Democratic Principle</h4>
            </div>
            <p className="font-sans text-sm text-ink/90 leading-relaxed font-medium">
              {democraticLesson}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
