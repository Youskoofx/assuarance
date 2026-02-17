import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-slate-950 text-white overflow-x-clip">
      {/* Accent top border */}
      <div className="h-[3px] w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500" />

      {/* Top CTA */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start text-center md:text-left">
              <img
                src="/images/image.png"
                alt="Prévoyance Services"
                className="h-[48px] sm:h-[60px] w-auto object-contain brightness-0 invert shrink-0"
              />
              <div>
                <p className="text-base sm:text-lg font-semibold leading-tight">
                  Prévoyance Services
                </p>
                <p className="text-slate-400 text-sm">
                  Courtier en assurances à Gennevilliers
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <Button
                asChild
                className="w-full sm:w-auto px-6 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto px-6 border-white/80 text-white hover:bg-white/10"
              >
                <Link to="/devis">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1 : Le groupe */}
          <nav className="lg:col-span-3" aria-label="Liens groupe">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Le groupe
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/qui-sommes-nous"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link
                  to="/actualites"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Actualités
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 2 : Santé */}
          <nav className="lg:col-span-2" aria-label="Liens santé">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Santé
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/particuliers/sante"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Assurance Santé
                </Link>
              </li>
              <li>
                <Link
                  to="/particuliers/prevoyance"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Prévoyance
                </Link>
              </li>
              <li>
                <Link
                  to="/pro/sante-tns"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Santé TNS
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 3 : Prévoyance */}
          <nav className="lg:col-span-2" aria-label="Liens prévoyance">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Prévoyance
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/particuliers/prevoyance"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Prévoyance Particuliers
                </Link>
              </li>
              <li>
                <Link
                  to="/pro/prevoyance-pro"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Prévoyance Pro
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 4 : IARD */}
          <nav className="lg:col-span-2" aria-label="Liens IARD">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              IARD
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/iard/auto"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Assurance Auto
                </Link>
              </li>
              <li>
                <Link
                  to="/iard/habitation"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Assurance Habitation
                </Link>
              </li>
              <li>
                <Link
                  to="/animaux"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  Assurance Animaux
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 5 : Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Nous contacter
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm leading-relaxed">
                  {CONTACT.address}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-slate-300 text-sm hover:text-teal-400"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-slate-300 text-sm hover:text-teal-400 break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">{CONTACT.hours}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 justify-between">
            <p className="text-slate-400 text-sm text-center lg:text-left">
              © {new Date().getFullYear()} Prévoyance Services. Tous droits réservés.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
              <div className="grid grid-cols-2 sm:flex items-center gap-x-6 gap-y-2 justify-items-center w-full sm:w-auto">
              <Link
                to="/mentions-legales"
                className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite"
                className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                to="/cookies"
                className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
              >
                Cookies
              </Link>
              <Link
                to="/accessibilite"
                className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
              >
                Accessibilité
              </Link>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com/prevoyanceservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/prevoyance.services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/prevoyanceservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal-600 text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              aria-label="Revenir en haut de page"
            >
              <ArrowUp className="w-4 h-4" />
              Haut de page
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
