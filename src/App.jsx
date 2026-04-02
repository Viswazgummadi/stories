import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import VedicOrigin from './components/VedicOrigin';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import { contentData } from './data/content';

function CustomScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const mainScroll = document.getElementById('main-scroll');
    if (!mainScroll) return;

    const handleScroll = () => {
      const scrollHeight = mainScroll.scrollHeight - mainScroll.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress(mainScroll.scrollTop / scrollHeight);
      }
    };

    mainScroll.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      mainScroll.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    const startY = e.clientY;
    const mainScroll = document.getElementById('main-scroll');
    const startScrollTop = mainScroll.scrollTop;

    document.body.style.userSelect = 'none';

    const onMove = (moveEvent) => {
      if (!trackRef.current) return;
      const trackHeight = trackRef.current.getBoundingClientRect().height;
      const thumbHeight = trackHeight * 0.14; 
      const scrollableTrackHeight = trackHeight - thumbHeight;
      
      const deltaY = moveEvent.clientY - startY;
      const progressDelta = deltaY / scrollableTrackHeight;
      const scrollHeight = mainScroll.scrollHeight - mainScroll.clientHeight;
      mainScroll.scrollTop = startScrollTop + progressDelta * scrollHeight;
    };

    const onUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    
    const thumbHeight = trackRect.height * 0.14; 
    let newProgress = (clickY - thumbHeight / 2) / (trackRect.height - thumbHeight);
    newProgress = Math.max(0, Math.min(1, newProgress));

    const mainScroll = document.getElementById('main-scroll');
    const scrollHeight = mainScroll.scrollHeight - mainScroll.clientHeight;
    mainScroll.scrollTo({ top: newProgress * scrollHeight, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-8 md:w-10 z-50 pointer-events-auto py-24 flex justify-center group touch-none"
      onClick={handleTrackClick}
      title="Scroll Track"
    >
      <div ref={trackRef} className="relative w-1.5 md:w-2 h-full opacity-60 md:opacity-100 transition-opacity">
        {/* Scroll Track Outline */}
        <div className="absolute inset-0 w-full rounded-full bg-white/10 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] border border-terracotta/10 cursor-pointer" />
        
        {/* Scroll Thumb */}
        <div 
          onPointerDown={handlePointerDown}
          className={`absolute w-full bg-gradient-to-b from-gold/50 to-terracotta/50 backdrop-blur-3xl shadow-[0_0_15px_rgba(184,134,11,0.6)] rounded-full border border-white/60 transition-all ease-linear cursor-grab active:cursor-grabbing hover:from-gold/80 hover:to-terracotta/80 hover:shadow-[0_0_25px_rgba(184,134,11,1)] ${isDragging ? 'from-gold/80 to-terracotta/80 shadow-[0_0_25px_rgba(184,134,11,1)] duration-0' : 'duration-[50ms]'}`}
          style={{ 
            height: '14%', 
            top: `${scrollProgress * 86}%`
          }} 
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <div id="main-scroll" className="h-[100dvh] w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth font-sans selection:bg-gold/30 selection:text-terracotta bg-ink relative">
      <CustomScrollIndicator />
      
      <div className="snap-start snap-always w-full min-h-screen">
          <Hero data={contentData.hero} />
      </div>
      
      <div className="snap-start snap-always w-full min-h-screen bg-[#FAF9F6]">
          <VedicOrigin data={contentData.vedic} />
      </div>
      
      {/* Map through Literature Categories applying alternate palettes */}
      {contentData.categories.map((category, index) => {
        // Distinct earthy/parchment alternating hues
        const palette = ["#F4F1EA", "#E8E2D2", "#FAF9F6", "#E1DCCC", "#F0EBE1"];
        const bgHex = palette[index % palette.length];
        
        return (
          <div key={index} className="snap-start snap-always w-full">
            <CategorySection 
              categoryName={category.categoryName}
              categoryIntro={category.categoryIntro}
              stories={category.stories}
              bgHex={bgHex}
            />
          </div>
        )
      })}

      <div className="snap-start w-full">
          <Footer />
      </div>
      
    </div>
  );
}

export default App;
