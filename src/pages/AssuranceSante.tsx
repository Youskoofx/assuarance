import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Heart, Users, CheckCircle } from 'lucide-react';

export default function AssuranceSante() {
  const offers = [
    {
      icon: Users,
      title: 'Complémentaire santé famille',
      description: 'Protection complète pour toute la famille avec des garanties adaptées à chaque âge.',
      features: ['Hospitalisation', 'Optique', 'Dentaire', 'Médecine douce'],
      image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      icon: Heart,
      title: 'Santé seniors & retraités',
      description: 'Des garanties renforcées pour les besoins spécifiques des seniors.',
      features: ['Soins courants', 'Hospitalisation', 'Prothèses auditives', 'Cures thermales'],
      image: 'https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      icon: Shield,
      title: 'Travailleurs indépendants',
      description: 'Solutions sur-mesure pour les professionnels indépendants.',
      features: ['Téléconsultation', 'Médecine spécialisée', 'Prévention', 'Assistance'],
      image: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1920'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 🏥 Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/8460159/pexels-photo-8460159.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Assurance Santé</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            Votre santé, notre priorité — des solutions adaptées à chaque étape de votre vie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-teal-700 font-semibold hover:bg-gray-100">
              Obtenir un devis gratuit
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Comparer les offres
            </Button>
          </div>
        </div>
      </section>

      {/* 💎 Offers Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Offres Santé</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des formules adaptées à chaque profil : famille, seniors ou travailleurs indépendants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {offers.map((offer, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-none"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-8">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <offer.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold"
                  >
                    En savoir plus
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 Section Avantages */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/8460150/pexels-photo-8460150.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Médecin souriant"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pourquoi choisir nos assurances santé ?</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
                Remboursements rapides et transparents
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
                Accès à des services de téléconsultation 24h/24
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
                Des garanties adaptées à vos besoins réels
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
                Accompagnement humain et disponible
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ✨ CTA */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-700 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Protégez votre santé dès aujourd'hui</h2>
          <p className="text-lg text-white/90 mb-10">
            Obtenez un devis personnalisé en quelques clics et découvrez la formule la plus adaptée à votre profil.
          </p>
          <Button size="lg" className="bg-white text-emerald-700 font-bold hover:bg-gray-100 rounded-lg">
            Demander un devis gratuit
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}