export default function Footer() {
  return (
    <footer className="bg-ink text-parchment py-12 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="w-12 h-1 bg-gold rounded-full mb-8"></div>
        <h3 className="text-2xl font-serif text-gold mb-2">Roots of Democracy in Ancient India</h3>
        <p className="text-parchment/60 font-sans text-sm mb-8">
          Curated for Legal Studies
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-parchment/80 hover:text-gold hover:scale-110 transition-transform duration-300">
            <span className="sr-only">About</span>
            Abstract
          </a>
          <a href="#" className="text-parchment/80 hover:text-gold hover:scale-110 transition-transform duration-300">
            <span className="sr-only">Sources</span>
            Sources
          </a>
          <a href="#" className="text-parchment/80 hover:text-gold hover:scale-110 transition-transform duration-300">
            <span className="sr-only">Contact</span>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
