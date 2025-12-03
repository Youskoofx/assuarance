import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Heart, Shield, FileText, Building, Car, ArrowRight, Check, HardHat } from 'lucide-react';

export default function Pro() {
  const services = [
    {
      icon: Heart,
      title: 'Santé TNS',
      description: 'Une couverture santé adaptée aux travailleurs non salariés. Bénéficiez de remboursements optimaux et de la déduction fiscale Madelin.',
      features: [
        'Remboursements hospitalisation',
        'Soins courants et spécialistes',
        'Dentaire et optique renforcés',
        'Déduction fiscale Loi Madelin'
      ],
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Prévoyance Pro',
      description: 'Protégez votre activité et vos revenus en cas d\'arrêt de travail, invalidité ou décès. Maintenez votre niveau de vie et celui de votre famille.',
      features: [
        'Indemnités journalières',
        'Rente invalidité',
        'Capital décès',
        'Protection du conjoint'
      ],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FileText,
      title: 'RC Professionnelle',
      description: 'Couvrez les dommages causés à vos clients ou tiers dans le cadre de votre activité. Obligatoire pour de nombreuses professions réglementées.',
      features: [
        'Dommages corporels et matériels',
        'Préjudices immatériels',
        'Défense et recours',
        'Protection juridique'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: HardHat,
      title: 'Garantie Décennale',
      description: 'Assurez vos chantiers et couvrez votre responsabilité décennale obligatoire pour les métiers du BTP.',
      features: [
        'Responsabilité décennale travaux',
        'Dommages aux ouvrages et solidité',
        'Sous-traitants et co-traitants',
        'Attestations rapides pour vos chantiers'
      ],
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Building,
      title: 'Multirisque Professionnelle',
      description: 'Protégez vos locaux, votre matériel et votre stock contre tous les risques : incendie, dégâts des eaux, vol, bris de machine.',
      features: [
        'Locaux et aménagements',
        'Matériel et équipements',
        'Stock et marchandises',
        'Perte d\'exploitation'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Car,
      title: 'Flotte Automobile',
      description: 'Assurez l\'ensemble de vos véhicules professionnels avec une gestion simplifiée et des tarifs préférentiels adaptés aux entreprises.',
      features: [
        'Gestion centralisée',
        'Tarifs dégressifs',
        'Véhicules de remplacement',
        'Assistance 24/7'
      ],
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const advantages = [
    'Accompagnement personnalisé par un conseiller dédié',
    'Devis gratuit et sans engagement',
    'Comparaison des meilleures offres du marché',
    'Gestion simplifiée de vos contrats',
    'Assistance en cas de sinistre',
    'Optimisation fiscale de vos cotisations'
  ];

  const faqs = [
    {
      question: 'Quelles assurances sont obligatoires pour mon entreprise ?',
      answer: 'Cela dépend de votre activité. La RC Pro est obligatoire pour les professions réglementées (santé, BTP, conseil...). L\'assurance auto est obligatoire pour tous les véhicules. La mutuelle d\'entreprise est obligatoire pour les salariés depuis 2016.'
    },
    {
      question: 'Puis-je déduire mes cotisations d\'assurance ?',
      answer: 'Oui, les cotisations d\'assurance professionnelle sont déductibles de votre résultat imposable. La Loi Madelin permet aux TNS de déduire leurs cotisations santé et prévoyance dans certaines limites.'
    },
    {
      question: 'Comment choisir le bon niveau de garanties ?',
      answer: 'Nous analysons votre activité, vos risques spécifiques et votre budget pour vous proposer les garanties adaptées. Un bilan gratuit permet d\'identifier vos besoins réels.'
    },
    {
      question: 'Que couvre exactement la RC Professionnelle ?',
      answer: 'Elle couvre les dommages corporels, matériels et immatériels causés à des tiers dans le cadre de votre activité professionnelle. Elle inclut aussi votre défense en cas de litige.'
    },
    {
      question: 'Puis-je assurer plusieurs véhicules sur un même contrat ?',
      answer: 'Oui, avec une assurance flotte automobile. Dès 3 véhicules, vous bénéficiez de tarifs préférentiels et d\'une gestion simplifiée.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <span className="text-white">Professionnels</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Assurances Professionnelles</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Des solutions pour les professionnels, indépendants et entreprises
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Protégez votre activité professionnelle</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Que vous soyez travailleur indépendant, chef d'entreprise ou profession libérale, 
            vos besoins en assurance sont spécifiques. Nous vous accompagnons pour sécuriser 
            votre activité, vos revenus et votre patrimoine professionnel.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            De la santé TNS à la multirisque professionnelle, découvrez nos solutions adaptées 
            à chaque métier et chaque situation.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Nos solutions professionnelles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
                  asChild
                >
                  <Link to="/devis">Demander un devis</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Pourquoi nous choisir ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-teal-600" />
                </div>
                <p className="text-slate-700 font-medium">{advantage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-xl shadow-md px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-teal-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Prêt à protéger votre activité ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Nos experts analysent vos besoins et vous proposent les meilleures solutions
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

     
    </div>
  );
}
