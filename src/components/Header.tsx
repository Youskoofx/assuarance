import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, UserCircle, ArrowRight } from 'lucide-react';

const SCROLL_THRESHOLD = 50; // px

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSolid, setIsSolid] = useState(false);
  const location = useLocation();

  // Transparent à l’arrivée sur chaque page, puis calcul en fonction du scroll
  useEffect(() => {
    setIsSolid(false); // force la transparence au change de route
    const id = requestAnimationFrame(() => {
      setIsSolid(window.scrollY > SCROLL_THRESHOLD);
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  // Écoute du scroll
  useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = {
    Particuliers: [
      { label: 'Santé', path: '/particuliers/sante' },
      { label: 'Prévoyance', path: '/particuliers/prevoyance' },
      { label: 'IARD', path: '/particuliers/iard' },
    ],
    Pro: [
      { label: 'Santé TNS', path: '/pro/sante-tns' },
      { label: 'Prévoyance Pro', path: '/pro/prevoyance-pro' },
      { label: 'RC Pro', path: '/pro/rc-pro' },
      { label: 'Multirisque Pro', path: '/pro/multirisque' },
      { label: 'Flotte Auto', path: '/pro/flotte-auto' },
    ],
  };

  const simpleLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Animaux', path: '/animaux' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`${isSolid ? 'sticky' : 'fixed'} top-0 left-0 w-full z-50 py-4 px-8 transition-all duration-300 ${
          isSolid ? 'bg-white shadow-md border-b-2 border-teal-500' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/images/image.png"
                alt="Prévoyance Services"
                className={`h-[120px] w-auto object-contain transition-all duration-300 ${
                  isSolid ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Accueil */}
              <Link
                to="/"
                className={`px-4 py-2 text-lg font-semibold transition-colors ${
                  isSolid ? 'text-slate-900 hover:text-teal-600' : 'text-white hover:text-teal-300'
                }`}
              >
                Accueil
              </Link>

              {/* Dropdowns */}
              {Object.entries(menuItems).map(([group, items]) => (
                <div
                  key={group}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center space-x-1 px-4 py-2 text-lg font-semibold transition-colors ${
                      isSolid ? 'text-slate-900 hover:text-teal-600' : 'text-white hover:text-teal-300'
                    }`}
                  >
                    <span>{group}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeDropdown === group && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-xl p-6 min-w-[240px] z-[60]">
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

              {/* Liens simples */}
              {simpleLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-lg font-semibold transition-colors ${
                    isSolid ? 'text-slate-900 hover:text-teal-600' : 'text-white hover:text-teal-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  isSolid
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
              className="lg:hidden p-2 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isSolid ? 'text-slate-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isSolid ? 'text-slate-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[140px] bg-white z-40 overflow-y-auto">
            <nav className="p-6 space-y-4">
              {['/', '/animaux', '/actualites', '/faq', '/contact'].map((path, i) => (
                <Link
                  key={path}
                  to={path}
                  className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {['Accueil', 'Animaux', 'Actualités', 'FAQ', 'Contact'][i]}
                </Link>
              ))}

              {/* Groupes */}
              {Object.entries(menuItems).map(([group, items]) => (
                <div key={group} className="border-t border-slate-100 pt-4">
                  <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase mb-2">{group}</h3>
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

      {/* Spacer : évite que le contenu passe sous le header quand il devient sticky */}
      {isSolid && <div className="h-[140px]" aria-hidden="true" />}
    </>
  );
};

export default Header;