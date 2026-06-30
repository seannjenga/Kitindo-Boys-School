interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onPortalClick: () => void;
  activeLanguage: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
}

export default function Header({
  isMenuOpen,
  onToggleMenu,
  onPortalClick,
  activeLanguage,
  onLanguageChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-xl border-b border-forest/10 px-6 py-4 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
          className="flex flex-col group cursor-pointer"
        >
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-forest group-hover:opacity-85 transition-opacity">
            Kitondo
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent mt-0.5 leading-none">
            School Portal
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#concept" className="font-semibold text-sm text-forest/70 hover:text-forest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
            {activeLanguage === 'en' ? 'Analytics' : 'Analyses'}
          </a>
          <a href="#concept" className="font-semibold text-sm text-forest/70 hover:text-forest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
            {activeLanguage === 'en' ? 'Learning' : 'Apprentissage'}
          </a>
          <a href="#concept" className="font-semibold text-sm text-forest/70 hover:text-forest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
            {activeLanguage === 'en' ? 'Finance' : 'Finances'}
          </a>
          <a href="#careers" className="font-semibold text-sm text-forest/70 hover:text-forest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
            {activeLanguage === 'en' ? 'About Us' : 'À propos'}
          </a>
        </nav>

        {/* Right side CTA / Actions */}
        <div className="flex items-center gap-6">
          
          {/* Language Selector */}
          <div className="hidden sm:flex items-center font-bold text-xs gap-1.5 border border-forest/10 bg-forest/5 px-3 py-1.5 rounded-full text-forest">
            <button 
              onClick={() => onLanguageChange('fr')} 
              className={`hover:text-accent transition-colors ${activeLanguage === 'fr' ? 'text-accent' : 'opacity-60'}`}
            >
              FR
            </button>
            <span className="opacity-30">|</span>
            <button 
              onClick={() => onLanguageChange('en')} 
              className={`hover:text-accent transition-colors ${activeLanguage === 'en' ? 'text-accent' : 'opacity-60'}`}
            >
              EN
            </button>
          </div>

          {/* Parent Portal CTA */}
          <button 
            onClick={onPortalClick}
            className="hidden sm:block px-6 py-2.5 bg-forest hover:bg-forest-light text-cream font-bold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 duration-200"
          >
            {activeLanguage === 'en' ? 'Parent Portal' : 'Portail Parents'}
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={onToggleMenu}
            aria-label="Toggle Menu"
            className="flex flex-col justify-center items-center w-10 h-10 border border-forest/15 rounded-full hover:bg-forest/5 transition-colors group relative"
          >
            <div className="space-y-1.5 w-5">
              <span className={`block h-[2px] bg-forest rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[4px] w-5' : 'w-5 group-hover:w-4'}`}></span>
              <span className={`block h-[2px] bg-forest rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[4px] w-5' : 'w-5 group-hover:w-5'}`}></span>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
}
