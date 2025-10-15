import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  'Le Groupe': [
    { label: 'Qui sommes-nous ?', href: '/a-propos' },
    { label: 'Nos actualités', href: '/actualites' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Réclamation', href: '/reclamation' }
  ],
  'Santé': [
    { label: 'Santé pour retraités', href: '/sante-retraites' },
    { label: 'Santé pour famille', href: '/sante-famille' },
    { label: 'Santé pour TNS', href: '/pro/sante-tns' },
    { label: 'Santé frontaliers suisses', href: '/sante-frontaliers' },
    { label: 'Santé pour animaux', href: '/animaux' },
    { label: 'Santé professionnelle', href: '/sante-pro' }
  ],
  'Prévoyance particuliers': [
    { label: 'Assurance décès', href: '/prevoyance-deces' },
    { label: 'Assurance accident de la vie', href: '/prevoyance-accident' },
    { label: 'Assurance obsèques', href: '/prevoyance-obseques' }
  ],
  'IARD': [
    { label: 'Assurance Auto', href: '/iard/auto' },
    { label: 'Assurance habitation', href: '/iard/habitation' },
    { label: 'Responsabilité civile', href: '/iard/rc' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Section 1 */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Logo + Description */}
            <div>
              <img 
                src="/images/image.png" 
                alt="Prévoyance Services" 
                className="h-[100px] w-auto mb-6 brightness-0 invert"
              />
              <p className="text-slate-400 max-w-md leading-relaxed mb-6">
                Votre courtier d'assurances à Gennevilliers. Des solutions personnalisées pour votre tranquillité d'esprit depuis 1997.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span>Gennevilliers, France</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span>01 XX XX XX XX</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span>contact@prevoyance-services.fr</span>
                </div>
              </div>
            </div>

            {/* Right: CTAs + Social */}
            <div className="flex flex-col items-start md:items-end gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  asChild
                >
                  <Link to="/contact">Nous contacter</Link>
                </Button>
                <Button 
                  variant="outline"
                  className="border-teal-600 text-teal-400 hover:bg-teal-600/10"
                  asChild
                >
                  <Link to="/reclamation">Formuler une réclamation</Link>
                </Button>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Links */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-bold mb-6">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-slate-400 hover:text-teal-400 transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>
              PRÉVOYANCE SERVICES© 2024 Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="hover:text-teal-400 transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-teal-400 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}