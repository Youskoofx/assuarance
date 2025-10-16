import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Home as HomeIcon, Shield, ArrowRight, Sparkles, LifeBuoy, Lock } from 'lucide-react';

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link: string;
  image: string;
};

export default function IARD() {
  const services: Service[] = [
    {
      icon: Car,
      title: 'Assurance Auto',
      description:
        "Protégez votre véhicule avec des garanties adaptées : responsabilité civile, vol, incendie, bris de glace, assistance 24/7. Formules Tiers, Tiers+ ou Tous Risques selon vos besoins.",
      link: '/iard/auto',
      image:
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1280',
    },
    {
      icon: HomeIcon,
      title: 'Assurance Habitation',
      description:
        "Votre foyer mérite la meilleure protection. Incendie, dégâts des eaux, vol, bris de glace, responsabilité civile. Options pour objets de valeur et catastrophes naturelles.",
      link: '/iard/habitation',
      image:
        'https://images.pexels.com/photos/259751/pexels-photo-259751.jpeg?auto=compress&cs=tinysrgb&w=1280',
    },
    {
      icon: Shield,
      title: 'Responsabilité Civile',
      description:
        "Couvrez les dommages involontaires causés à autrui dans votre vie quotidienne. Accidents domestiques, loisirs, dégâts matériels : vivez sereinement.",
      link: '/iard/responsabilite-civile',
      image:
        'https://images.pexels.com/photos/7735776/pexels-photo-7735776.jpeg?auto=compress&cs=tinysrgb&w=1280',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO visuel */}
      <section className="relative h-[56vh] min-h-[440px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <nav className="text-white/70 text-sm mb-4">
              <Link to="/" className="hover:text-white">Accueil</Link>
              <span className="mx-1">/</span>
              <span className="text-white">IARD</span>
            </nav>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              Assurances IARD
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Assurez vos biens, vivez en toute sérénité.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                🔥 147 devis cette semaine
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                ⭐ 94% de satisfaction
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                ⏱️ Réponse sous 2h
              </span>
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-teal-600 hover:bg-slate-50 font-bold"
              >
                <Link to="/devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="#solutions">Découvrir nos solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explication IARD */}
      <section className="py-16 md:py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Qu&apos;est-ce que l&apos;assurance IARD ?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            <strong>IARD</strong> signifie <strong>Incendie, Accidents et Risques Divers</strong>. Ce domaine regroupe toutes les assurances qui protègent vos biens matériels (voiture, maison, objets de valeur) et votre responsabilité civile.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Contrairement aux assurances de personnes (santé, prévoyance), l&apos;IARD couvre les dommages matériels et les responsabilités que vous pourriez avoir envers des tiers. C&apos;est la protection essentielle pour vivre sereinement au quotidien.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section id="solutions" className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Nos solutions IARD
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <article
                key={service.title}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center mb-5 shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold flex-1 hover:scale-[1.02] transition"
                      asChild
                    >
                      <Link to={service.link} className="flex items-center justify-center gap-2">
                        Découvrir
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 border-teal-500 text-teal-700 hover:bg-teal-50"
                    >
                      <Link to="/devis">Devis</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau rassurance */}
      <section className="py-14 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Conseils sur mesure</p>
              <p className="text-slate-600 text-sm mt-1">
                Un courtier dédié pour vous recommander les garanties utiles — rien de superflu.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <LifeBuoy className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Assistance 24/7</p>
              <p className="text-slate-600 text-sm mt-1">
                Panne, sinistre ou urgence : nous vous accompagnons à chaque étape.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <Lock className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Données sécurisées</p>
              <p className="text-slate-600 text-sm mt-1">
                Cryptage SSL, confidentialité stricte et aucune revente de données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Besoin d&apos;un devis personnalisé ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nos conseillers analysent vos besoins et vous proposent les meilleures solutions.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              asChild
              size="lg"
              className="bg-white text-teal-600 hover:bg-slate-50 font-bold px-8 py-6 text-lg"
            >
              <Link to="/devis">Demander un devis gratuit</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/contact">Parler à un conseiller</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}