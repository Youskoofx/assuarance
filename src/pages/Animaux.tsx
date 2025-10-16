import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Stethoscope, Syringe, Check, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Animaux() {
  const formules = [
    {
      name: 'Essentiel',
      features: [
        'Consultations vétérinaires',
        'Médicaments prescrits',
        'Analyses et examens',
        'Chirurgie d\'urgence',
        'Hospitalisation'
      ]
    },
    {
      name: 'Confort',
      features: [
        'Toutes garanties Essentiel',
        'Vaccins et vermifuges',
        'Stérilisation',
        'Détartrage',
        'Frais de prévention'
      ],
      popular: true
    },
    {
      name: 'Premium',
      features: [
        'Toutes garanties Confort',
        'Médecines douces',
        'Rééducation',
        'Prothèses',
        'Assistance rapatriement'
      ]
    }
  ];

  const animaux = [
    { name: 'Chiens', icon: '🐕' },
    { name: 'Chats', icon: '🐈' },
    { name: 'Lapins', icon: '🐰' },
    { name: 'Furets', icon: '🦡' },
    { name: 'Oiseaux', icon: '🦜' },
    { name: 'Rongeurs', icon: '🐹' }
  ];

  const faqs = [
    {
      question: 'À partir de quel âge puis-je assurer mon animal ?',
      answer: 'Vous pouvez assurer votre animal dès ses 2 mois. Certaines formules acceptent les animaux jusqu\'à 8 ans pour une première souscription.'
    },
    {
      question: 'Y a-t-il un délai de carence ?',
      answer: 'Oui, un délai de carence de 48h pour les accidents et 30 jours pour les maladies s\'applique après la souscription.'
    },
    {
      question: 'Puis-je choisir mon vétérinaire ?',
      answer: 'Absolument ! Vous êtes libre de consulter le vétérinaire de votre choix, en clinique ou à domicile.'
    },
    {
      question: 'Comment sont calculés les remboursements ?',
      answer: 'Les remboursements sont calculés sur la base des frais réels engagés, selon le taux de remboursement de votre formule (50%, 70% ou 90%).'
    },
    {
      question: 'Les maladies héréditaires sont-elles couvertes ?',
      answer: 'Oui, selon la formule choisie. La formule Premium couvre les maladies héréditaires et congénitales.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <span className="text-white">Animaux</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Assurance Animaux</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Prenez soin de vos compagnons comme de votre famille
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pourquoi assurer votre animal ?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Les frais vétérinaires peuvent rapidement devenir importants en cas de maladie ou d'accident. 
            Une assurance santé animale vous permet de soigner votre compagnon sans vous soucier du coût.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Consultations, chirurgies, médicaments, examens : offrez-lui les meilleurs soins tout en maîtrisant votre budget.
          </p>
        </div>
      </section>

      {/* Formules */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Nos formules</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {formules.map((formule, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
                  formule.popular ? 'ring-2 ring-teal-500' : ''
                }`}
              >
                {formule.popular && (
                  <div className="bg-teal-500 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    Le plus choisi
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{formule.name}</h3>
                <ul className="space-y-3 mb-8">
                  {formule.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
                  asChild
                >
                  <Link to="/devis">Choisir cette formule</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animaux couverts */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Animaux couverts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {animaux.map((animal, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-3">{animal.icon}</div>
                <p className="font-semibold text-slate-900">{animal.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemple remboursement */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Exemple de remboursement</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-semibold text-slate-900">Chirurgie suite à accident</span>
                <span className="text-slate-600">1 200 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-semibold text-slate-900">Hospitalisation 3 jours</span>
                <span className="text-slate-600">450 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-semibold text-slate-900">Médicaments</span>
                <span className="text-slate-600">180 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-300">
                <span className="font-bold text-slate-900">Total frais</span>
                <span className="font-bold text-slate-900">1 830 €</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-teal-600 text-lg">Remboursement formule Confort (70%)</span>
                <span className="font-bold text-teal-600 text-2xl">1 281 €</span>
              </div>
            </div>
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
          <h2 className="text-4xl font-bold text-white mb-6">Protégez votre compagnon dès maintenant</h2>
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

      <Footer />
    </div>
  );
}
