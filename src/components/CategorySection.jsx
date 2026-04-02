import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import StoryCard from './StoryCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function CategorySection({ categoryName, categoryIntro, stories, bgHex }) {
  // Enhanced glassmorphism requires higher transparency
  const headerBg = bgHex ? `${bgHex}A6` : 'rgba(250, 249, 246, 0.65)'; // ~65% opacity for stronger glass effect

  return (
    <section 
      style={{ backgroundColor: bgHex || '#FAF9F6' }}
      className="pb-24 relative snap-start snap-always min-h-[100dvh] flex flex-col pt-0"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col flex-grow relative">
        
        {/* 
          STICKY HEADER (Glassmorphic Bar)
          Fixed close to the top, spanning the full width of the container so its length never changes across sections.
        */}
        <div className="sticky top-6 md:top-8 z-30 w-full">
          <div 
            style={{ backgroundColor: headerBg }}
            className="w-full px-6 md:px-10 py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-gold m-0 font-medium tracking-wide">
              {categoryName}
            </h2>
          </div>
        </div>

        {/* INTRO PARAGRAPH 
            Naturally scrolls away under the sticky header when scrolling down 
        */}
        <div className="mt-8 mb-16">
          <p className="text-xl md:text-2xl text-ink/80 font-sans max-w-4xl leading-relaxed font-light">
            {categoryIntro}
          </p>
        </div>

        {/* 
          SNAP POINT 2: THE GRID 
          This is exactly the pause moment the user requested!
          scroll-mt-[120px] ensures it snaps with enough space for the ~100px sticky header above it,
          pausing perfectly so the top of the cards align!
        */}
        <div className="snap-start snap-always w-full scroll-mt-[120px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            {stories.map((story, index) => (
              <StoryCard 
                key={index}
                title={story.title}
                image={story.image}
                storyText={story.storyText}
                democraticLesson={story.democraticLesson}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
