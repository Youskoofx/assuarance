import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, UserCircle, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = {
    'Particuliers': [
      { label: 'Santé', path: '/particuliers/sante' },
      { label: 'Prévoyance', path: '/particuliers/prevoyance' },
      { label: 'IARD', path: '/particuliers/iard' },
    ],
    'Pro': [
      { label: 'Santé TNS', path: '/pro/sante-tns' },
      { label: 'Prévoyance Pro', path: '/pro/prevoyance-pro' },
      { label: 'RC Pro', path: '/pro/rc-pro' },
      { label: 'Multirisque Pro', path: '/pro/multirisque' },
      { label: 'Flotte Auto', path: '/pro/flotte-auto' },
    ]
  };

  const simpleLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Animaux', path: '/animaux' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 py-4 px-8 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md border-b-2 border-teal-500' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/image.png" 
              alt="Prévoyance Services" 
              className={`h-[120px] w-auto object-contain transition-all duration-300 ${
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
                className={`px-4 py-2 text-lg font-semibold transition-colors ${
                  isScrolled 
                    ? 'text-slate-900 hover:text-teal-600' 
                    : 'text-white hover:text-teal-300'
                } ${location.pathname === link.path ? 'text-teal-600' : ''}`}
              >
                {link.label}
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
                  className={`flex items-center space-x-1 px-4 py-2 text-lg font-semibold transition-colors ${
                    isScrolled 
                      ? 'text-slate-900 hover:text-teal-600' 
                      : 'text-white hover:text-teal-300'
                  }`}
                >
                  <span>{key}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeDropdown === key && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-xl p-6 min-w-[220px]">
                    {items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-3 rounded-lg text-slate-700 hover:text-teal-600 hover:bg-teal-50 font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {simpleLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-lg font-semibold transition-colors ${
                  isScrolled 
                    ? 'text-slate-900 hover:text-teal-600' 
                    : 'text-white hover:text-teal-300'
                } ${location.pathname === link.path ? 'text-teal-600' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline"
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                isScrolled
                  ? 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
                  : 'border-2 border-white text-white hover:bg-white/10'
              }`}
              asChild
            >
              <Link to="/espace-client" className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Espace Client
              </Link>
            </Button>

            <Button 
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
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
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[140px] bg-white z-40 overflow-y-auto">
          <nav className="p-6 space-y-4">
            {simpleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {Object.entries(menuItems).map(([key, items]) => (
              <div key={key} className="border-t border-slate-100 pt-4">
                <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase mb-2">
                  {key}
                </h3>
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
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
                className="w-full border-2 border-teal-600 text-teal-600"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <Link to="/espace-client">Espace Client</Link>
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
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