import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Heart, Users, CheckCircle } from 'lucide-react';

export default function SantePage() {
  const offers = [
    {
      icon: Users,
      title: 'Complémentaire santé famille',
      description: 'Protection complète pour toute la famille avec des garanties adaptées à chaque âge.',
      features: ['Hospitalisation', 'Optique', 'Dentaire', 'Médecine douce']
    },
    {
      icon: Heart,
      title: 'Santé seniors & retraités',
      description: 'Des garanties renforcées pour les besoins spécifiques des seniors.',
      features: ['Soins courants', 'Hospitalisation', 'Prothèses auditives', 'Cures thermales']
    },
    {
      icon: Shield,
      title: 'Travailleurs indépendants',
      description: 'Solutions sur-mesure pour les professionnels indépendants.',
      features: ['Téléconsultation', 'Médecine spécialisée', 'Prévention', 'Assistance']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Assurance Santé
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Protégez votre santé et celle de vos proches avec nos solutions d'assurance santé adaptées à vos besoins.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-[#10B981] to-[#0E766E] text-white rounded-lg">
                Obtenir un devis gratuit
              </Button>
              <Button size="lg" variant="outline" className="rounded-lg">
                Comparer les offres
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos offres santé
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions adaptées à chaque profil et chaque besoin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100 rounded-xl">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <offer.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {offer.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full rounded-lg border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  En savoir plus
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à protéger votre santé ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Obtenez votre devis personnalisé en quelques minutes
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 rounded-lg">
            Demander un devis gratuit
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
