import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Mail } from 'lucide-react';

export default function Merci() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="min-h-[80vh] flex items-center justify-center px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Demande envoyée !</h1>
          
          <p className="text-xl text-slate-600 mb-4 leading-relaxed">
            Merci pour votre confiance. Votre demande de devis a bien été enregistrée.
          </p>
          
          <p className="text-lg text-slate-600 mb-12">
            Un de nos conseillers vous contactera sous <strong>24 heures</strong> pour étudier votre dossier et vous proposer les meilleures solutions.
          </p>

          <div className="bg-slate-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Et maintenant ?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Vérifiez votre boîte mail</p>
                  <p className="text-slate-600">Vous allez recevoir un email de confirmation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Préparez vos questions</p>
                  <p className="text-slate-600">Notez tous les points que vous souhaitez aborder</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Restez disponible</p>
                  <p className="text-slate-600">Nous vous appellerons sur le numéro indiqué</p>
                </div>
              </div>
            </div>
          </div>

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
                <Mail className="w-5 h-5" />
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
