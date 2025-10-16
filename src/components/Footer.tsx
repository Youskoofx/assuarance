import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Top Section */}
      <div className="border-b border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <img 
                src="/images/image.png" 
                alt="Prévoyance Services" 
                className="h-[100px] w-auto object-contain brightness-0 invert mb-4 mx-auto md:mx-0"
              />
              <p className="text-slate-400 max-w-md">
                Votre courtier en assurances de confiance à Gennevilliers depuis plus de 20 ans
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Réclamation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Le Groupe */}
            <div>
              <h3 className="text-lg font-bold mb-4">Le Groupe</h3>
              <ul className="space-y-2">
                <li><Link to="/qui-sommes-nous" className="text-slate-400 hover:text-teal-400 transition-colors">Qui sommes-nous</Link></li>
                <li><Link to="/actualites" className="text-slate-400 hover:text-teal-400 transition-colors">Actualités</Link></li>
                <li><Link to="/faq" className="text-slate-400 hover:text-teal-400 transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-teal-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Santé */}
            <div>
              <h3 className="text-lg font-bold mb-4">Santé</h3>
              <ul className="space-y-2">
                <li><Link to="/particuliers/sante" className="text-slate-400 hover:text-teal-400 transition-colors">Assurance Santé</Link></li>
                <li><Link to="/particuliers/prevoyance" className="text-slate-400 hover:text-teal-400 transition-colors">Prévoyance</Link></li>
                <li><Link to="/pro/sante-tns" className="text-slate-400 hover:text-teal-400 transition-colors">Santé TNS</Link></li>
              </ul>
            </div>

            {/* Prévoyance */}
            <div>
              <h3 className="text-lg font-bold mb-4">Prévoyance</h3>
              <ul className="space-y-2">
                <li><Link to="/particuliers/prevoyance" className="text-slate-400 hover:text-teal-400 transition-colors">Prévoyance Particuliers</Link></li>
                <li><Link to="/pro/prevoyance-pro" className="text-slate-400 hover:text-teal-400 transition-colors">Prévoyance Pro</Link></li>
              </ul>
            </div>

            {/* IARD */}
            <div>
              <h3 className="text-lg font-bold mb-4">IARD</h3>
              <ul className="space-y-2">
                <li><Link to="/iard/auto" className="text-slate-400 hover:text-teal-400 transition-colors">Assurance Auto</Link></li>
                <li><Link to="/iard/habitation" className="text-slate-400 hover:text-teal-400 transition-colors">Assurance Habitation</Link></li>
                <li><Link to="/animaux" className="text-slate-400 hover:text-teal-400 transition-colors">Assurance Animaux</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Adresse</p>
                  <p className="text-slate-400 text-sm">{CONTACT.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Téléphone</p>
                  <a href={`tel:${CONTACT.phone}`} className="text-slate-400 text-sm hover:text-teal-400">{CONTACT.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-slate-400 text-sm hover:text-teal-400">{CONTACT.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Horaires</p>
                  <p className="text-slate-400 text-sm">{CONTACT.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Prévoyance Services. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/mentions-legales" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
                Confidentialité
              </Link>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com/prevoyanceservices" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/prevoyanceservices" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/prevoyanceservices" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}