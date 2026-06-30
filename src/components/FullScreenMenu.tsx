import { X } from 'lucide-react';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onPortalClick: () => void;
  activeLanguage: 'en' | 'fr';
}

export default function FullScreenMenu({
  isOpen,
  onClose,
  onPortalClick,
  activeLanguage,
}: FullScreenMenuProps) {
  if (!isOpen) return null;

  const handlePortalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    onPortalClick();
  };

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full bg-forest text-cream flex flex-col justify-between p-6 md:p-12 animate-fade-in transition-all duration-300">
      
      {/* Top Header of Full Screen Menu */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-cream">
            Kitondo
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent mt-0.5 leading-none">
            School Portal
          </span>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close Menu"
          className="flex justify-center items-center w-10 h-10 border border-cream/20 rounded-full hover:bg-cream/10 transition-transform duration-300 hover:rotate-90"
        >
          <X className="w-5 h-5 text-cream" />
        </button>
      </div>

      {/* Main Grid: Links and Campuses */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 my-12 overflow-y-auto">
        
        {/* Large Navigation Links */}
        <nav className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
          <a 
            href="#concept" 
            onClick={onClose}
            className="font-display text-4xl md:text-6xl font-semibold hover:text-accent transition-colors duration-300 block"
          >
            {activeLanguage === 'en' ? 'Analytics' : 'Analyses'}
          </a>
          <a 
            href="#concept" 
            onClick={onClose}
            className="font-display text-4xl md:text-6xl font-semibold hover:text-accent transition-colors duration-300 block"
          >
            {activeLanguage === 'en' ? 'Learning' : 'Apprentissage'}
          </a>
          <a 
            href="#concept" 
            onClick={onClose}
            className="font-display text-4xl md:text-6xl font-semibold hover:text-accent transition-colors duration-300 block"
          >
            {activeLanguage === 'en' ? 'Finance' : 'Finances'}
          </a>
          <a 
            href="#cooperative" 
            onClick={onClose}
            className="font-display text-4xl md:text-6xl font-semibold hover:text-accent transition-colors duration-300 block"
          >
            {activeLanguage === 'en' ? 'About Us' : 'À propos'}
          </a>
          <a 
            href="#" 
            onClick={handlePortalLink}
            className="font-display text-4xl md:text-6xl font-semibold text-accent hover:text-emerald-300 transition-colors duration-300 block"
          >
            {activeLanguage === 'en' ? 'Parent Portal' : 'Portail Parents'}
          </a>
        </nav>

        {/* Campuses & Contact Columns */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-24 text-left">
          
          {/* Campuses Column */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              {activeLanguage === 'en' ? 'Our Campuses' : 'Nos Campus'}
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>Kitondo Main Campus</li>
              <li>Terrebonne (QC)</li>
              <li>St-Augustin-de-Desbiens</li>
              <li>Trois-Rivières (QC)</li>
              <li>Dakar (Senegal)</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a href="mailto:info@kitondo.school" className="hover:text-accent transition-colors">
                  info@kitondo.school
                </a>
              </li>
              <li>+254 700 000 000</li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="hover:text-accent transition-colors font-bold text-xs uppercase">Facebook</a>
                <a href="#" className="hover:text-accent transition-colors font-bold text-xs uppercase">Instagram</a>
                <a href="#" className="hover:text-accent transition-colors font-bold text-xs uppercase">LinkedIn</a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto w-full border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50">
        <p>© 2026 Kitondo Boys School. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Designed in partnership with Mambo Mambo</p>
      </div>

    </div>
  );
}
