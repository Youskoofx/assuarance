import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, UserCircle, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = {
    'Pro': [
      { label: 'Santé TNS', path: '/pro/sante-tns' },
      { label: 'Prévoyance Pro', path: '/pro/prevoyance-pro' },
    ],
    'IARD': [
      { label: 'Auto', path: '/iard/auto' },
      { label: 'Habitation', path: '/iard/habitation' },
    ]
  };

  const simpleLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Animaux', path: '/animaux' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'FAQ', path: '/faq' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg text-slate-900 py-3 border-b border-teal-100' 
          : 'bg-transparent text-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-all duration-300">
            <img 
              src="/images/image.png" 
              alt="Prévoyance Services" 
              className={`h-[100px] w-auto object-contain transition-all duration-300 ${
                isScrolled ? '' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {simpleLinks.slice(0, 1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-teal-600 relative group ${
                  location.pathname === link.path ? 'text-teal-600' : ''
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 transform origin-left transition-transform duration-200 ${
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}

            {Object.entries(menuItems).map(([key, items]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-teal-600"
                >
                  <span>{key}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeDropdown === key && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 min-w-[220px] overflow-hidden">
                    <div className="p-4">
                      {items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors duration-150"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {simpleLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-teal-600 relative group ${
                  location.pathname === link.path ? 'text-teal-600' : ''
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 transform origin-left transition-transform duration-200 ${
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Section: Espace Client + Devis */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Espace Client */}
            <Button 
              variant="outline"
              className={`border rounded-lg transition-all duration-200 ${
                isScrolled 
                  ? 'border-slate-300 hover:border-teal-500 hover:bg-teal-50 text-slate-700 hover:text-teal-600' 
                  : 'border-white/50 hover:bg-white/10 text-white'
              }`}
              asChild
            >
              <Link to="/espace-client" className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Espace Client
              </Link>
            </Button>

            {/* Devis Button - COULEURS DU LOGO */}
            <Button 
              className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-bold rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
              asChild
            >
              <Link to="/devis" className="flex items-center gap-2">
                Devis gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-white/98 backdrop-blur-lg z-40">
          <nav className="p-6 space-y-4 overflow-y-auto h-full">
            {simpleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {Object.entries(menuItems).map(([key, items]) => (
              <div key={key} className="border-t border-slate-100 pt-4">
                <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {key}
                </h3>
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="pt-4 space-y-3">
              <Button 
                variant="outline"
                className="w-full border-slate-300 text-slate-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <Link to="/espace-client" className="flex items-center justify-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  Espace Client
                </Link>
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-lg"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <Link to="/devis">Devis gratuit</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;