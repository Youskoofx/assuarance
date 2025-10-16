import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Home, ArrowRight, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Particuliers() {
  const services = [
    {
      icon: Heart,
      title: 'Santé',
      description: 'Une couverture complète pour vos frais médicaux et ceux de votre famille. Consultations, hospitalisations, soins dentaires et optique.',
      link: '/particuliers/sante',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Prévoyance',
      description: 'Protégez vos proches en cas d\'imprévu. Capital décès, rente éducation, garantie invalidité pour assurer l\'avenir de votre famille.',
      link: '/particuliers/prevoyance',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Home,
      title: 'IARD',
      description: 'Assurez vos biens et votre responsabilité. Auto, habitation, responsabilité civile : vivez sereinement au quotidien.',
      link: '/particuliers/iard',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const advantages = [
    {
      title: 'Accompagnement personnalisé',
      description: 'Un conseiller dédié pour comprendre vos besoins et vous guider dans vos choix.'
    },
    {
      title: 'Clarté et transparence',
      description: 'Des explications simples, sans jargon. Vous savez exactement ce que vous souscrivez.'
    },
    {
      title: 'Service client réactif',
      description: 'Une équipe disponible et à l\'écoute pour répondre à toutes vos questions rapidement.'
    },
    {
      title: 'Offres sur mesure',
      description: 'Des solutions adaptées à votre situation, votre budget et vos priorités.'
    }
  ];

  const faqs = [
    {
      question: 'Comment choisir la bonne assurance ?',
      answer: 'Nous analysons votre situation personnelle, vos besoins et votre budget pour vous proposer les solutions les plus adaptées. Un conseiller vous accompagne dans votre choix.'
    },
    {
      question: 'Puis-je modifier mon contrat en cours d\'année ?',
      answer: 'Oui, selon les conditions de votre contrat. Certaines modifications sont possibles à tout moment, d\'autres à la date anniversaire. Contactez-nous pour étudier votre situation.'
    },
    {
      question: 'Combien de temps pour obtenir un devis ?',
      answer: 'Vous recevez une première estimation sous 24h. Après étude approfondie de votre dossier, nous vous présentons les meilleures offres sous 48h.'
    },
    {
      question: 'Vos services sont-ils payants ?',
      answer: 'Non, nos conseils et notre accompagnement sont gratuits. Nous sommes rémunérés par les compagnies d\'assurance, sans surcoût pour vous.'
    },
    {
      question: 'Que se passe-t-il en cas de sinistre ?',
      answer: 'Nous vous accompagnons dans toutes vos démarches : déclaration, suivi du dossier, échanges avec l\'assureur. Vous n\'êtes jamais seul.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <span className="text-white">Particuliers</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Assurances pour Particuliers</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Des assurances adaptées à chaque situation de vie. Que vous soyez étudiant, salarié ou retraité, nos solutions s'adaptent à chaque étape de votre vie.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Notre mission : vous simplifier l'assurance</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Chez Prévoyance Services, nous croyons que l'assurance doit être claire, accessible et adaptée à vos besoins réels. 
              Notre équipe vous accompagne pour trouver les meilleures solutions, sans complexité ni surprise.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <Button 
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold hover:scale-105 transition-all"
                  asChild
                >
                  <Link to={service.link} className="flex items-center gap-2">
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Pourquoi nous choisir ?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{advantage.title}</h3>
                    <p className="text-slate-600">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-8">
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
          <h2 className="text-4xl font-bold text-white mb-6">Prêt à vous protéger ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Demandez votre devis personnalisé en quelques clics
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
