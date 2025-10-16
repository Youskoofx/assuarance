import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HeartPulse, Users, Briefcase, CheckCircle } from 'lucide-react';

export default function AssurancePrevoyance() {
  const offers = [
    {
      icon: HeartPulse,
      title: 'Prévoyance individuelle',
      description:
        'Protégez votre avenir et celui de vos proches en cas d’imprévu (décès, invalidité, arrêt de travail).',
      features: [
        'Rente ou capital garanti',
        'Protection du revenu',
        'Souplesse des cotisations',
        'Garantie décès/invalidité',
      ],
      image:
        'https://images.pexels.com/photos/8460186/pexels-photo-8460186.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
    {
      icon: Users,
      title: 'Prévoyance famille',
      description:
        'Assurez la sécurité financière de vos proches grâce à une couverture complète en cas de coup dur.',
      features: [
        'Capital versé aux proches',
        'Couverture enfants et conjoint',
        'Assistance et accompagnement',
        'Aide aux démarches administratives',
      ],
      image:
        'https://images.pexels.com/photos/5257756/pexels-photo-5257756.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
    {
      icon: Briefcase,
      title: 'Prévoyance professionnelle (TNS)',
      description:
        'Protégez vos revenus et votre activité en cas d’accident ou d’arrêt de travail prolongé.',
      features: [
        'Indemnités journalières',
        'Rente en cas d’invalidité',
        'Capital décès',
        'Accompagnement juridique et fiscal',
      ],
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/8867483/pexels-photo-8867483.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Assurance Prévoyance</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Anticipez l’avenir sereinement et protégez vos proches face aux imprévus de la vie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-amber-700 font-semibold hover:bg-gray-100">
              Obtenir un devis gratuit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos solutions de prévoyance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des formules adaptées à votre profil pour garantir la sécurité de vos proches et de
              votre avenir.
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
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                    <offer.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold"
                  >
                    Découvrir cette offre
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/8460138/pexels-photo-8460138.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Sécurité financière"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi souscrire une assurance prévoyance ?
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
                Maintenez votre niveau de vie en cas d’arrêt de travail.
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
                Garantissez la sécurité financière de vos proches.
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
                Bénéficiez d’un accompagnement humain et réactif.
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
                Des formules personnalisables selon votre situation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-600 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Anticipez dès aujourd’hui, pour demain
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Nos conseillers vous accompagnent pour choisir la meilleure solution de prévoyance
            adaptée à vos besoins.
          </p>
          <Button size="lg" className="bg-white text-amber-700 font-bold hover:bg-gray-100 rounded-lg">
            Demander un devis gratuit
          </Button>
        </div>
      </section>
    </div>
  );
}