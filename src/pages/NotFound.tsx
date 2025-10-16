import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="min-h-[80vh] flex items-center justify-center px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-9xl font-bold text-teal-500 mb-6">404</div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Page non trouvée</h1>
          
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
              asChild
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-slate-300"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Contactez-nous
              </Link>
            </Button>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pages populaires</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/particuliers/sante" className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <p className="font-semibold text-slate-900">Assurance Santé</p>
              </Link>
              <Link to="/particuliers/iard/auto" className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <p className="font-semibold text-slate-900">Assurance Auto</p>
              </Link>
              <Link to="/devis" className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <p className="font-semibold text-slate-900">Demander un devis</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}
