import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Car, Home as HomeIcon, Shield, ArrowRight } from 'lucide-react';

export default function IARD() {
  const services = [
    {
      icon: Car,
      title: 'Assurance Auto',
      description: 'Protégez votre véhicule avec des garanties adaptées : responsabilité civile, vol, incendie, bris de glace, assistance 24/7. Formules Tiers, Tiers+ ou Tous Risques selon vos besoins.',
      link: '/iard/auto',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80'
    },
    {
      icon: HomeIcon,
      title: 'Assurance Habitation',
      description: 'Votre foyer mérite la meilleure protection. Incendie, dégâts des eaux, vol, bris de glace, responsabilité civile. Options pour objets de valeur et catastrophes naturelles.',
      link: '/iard/habitation',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
    },
    {
      icon: Shield,
      title: 'Responsabilité Civile',
      description: 'Couvrez les dommages involontaires causés à autrui dans votre vie quotidienne. Accidents domestiques, loisirs, dégâts matériels : vivez sereinement.',
      link: '/iard/responsabilite-civile',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <Link to="/particuliers" className="hover:text-white">Particuliers</Link> / <span className="text-white">IARD</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Assurances IARD</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Assurez vos biens, vivez en toute sérénité
          </p>
        </div>
      </section>

      {/* Explication IARD */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Qu'est-ce que l'assurance IARD ?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            <strong>IARD</strong> signifie <strong>Incendie, Accidents et Risques Divers</strong>. 
            Ce domaine regroupe toutes les assurances qui protègent vos biens matériels (voiture, maison, objets de valeur) 
            et votre responsabilité civile.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Contrairement aux assurances de personnes (santé, prévoyance), l'IARD couvre les dommages matériels 
            et les responsabilités que vous pourriez avoir envers des tiers. C'est la protection essentielle 
            pour vivre sereinement au quotidien.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Nos solutions IARD</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button 
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold w-full hover:scale-105 transition-all"
                    asChild
                  >
                    <Link to={service.link} className="flex items-center justify-center gap-2">
                      Découvrir
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Besoin d'un devis personnalisé ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Nos conseillers analysent vos besoins et vous proposent les meilleures solutions
          </p>
          <Button 
            size="lg"
            className="bg-white text-teal-600 hover:bg-slate-50 font-bold px-8 py-6 text-lg"
            asChild
          >
            <Link to="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
