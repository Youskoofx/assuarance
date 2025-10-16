// src/pages/Animaux.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Animaux() {
  const animaux = [
    { name: 'Chiens', icon: '🐕' },
    { name: 'Chats', icon: '🐈' },
    { name: 'Lapins', icon: '🐰' },
    { name: 'Furets', icon: '🦡' },
    { name: 'Oiseaux', icon: '🦜' },
    { name: 'Rongeurs', icon: '🐹' },
  ];

  const faqs = [
    {
      question: 'À partir de quel âge puis-je assurer mon animal ?',
      answer:
        "L’adhésion est possible dès les premières semaines de vie (après sevrage). Certaines restrictions d’âge à la première adhésion peuvent exister selon les contrats.",
    },
    {
      question: 'Puis-je choisir librement mon vétérinaire ?',
      answer:
        "Oui. Vous restez libre de consulter le professionnel de votre choix, en clinique ou à domicile.",
    },
    {
      question: 'Comment sont gérés les soins courants et les interventions ?',
      answer:
        "Les soins (consultations, examens, chirurgies, médicaments, hospitalisation, etc.) sont pris en charge selon les garanties du contrat sélectionné. Nous vous guidons pour choisir une couverture adaptée à votre compagnon.",
    },
    {
      question: 'Les maladies héréditaires et les affections chroniques peuvent-elles être couvertes ?',
      answer:
        "Selon les niveaux de garanties et les conditions, certaines pathologies héréditaires, congénitales ou chroniques peuvent être éligibles. Les exclusions précises figurent dans la notice d’information.",
    },
    {
      question: 'Comment demander un accompagnement personnalisé ?',
      answer:
        "Vous pouvez faire une demande de devis en ligne. Un conseiller vous recontacte rapidement pour préciser vos besoins et vous orienter vers une solution claire et adaptée.",
    },
  ];

  return (
    <div className="bg-white">
      {/* 🎥 HERO VIDÉO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden isolate">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
        >
          {/* Remplace par ta propre vidéo si besoin */}
          <source
            src="https://www.pexels.com/fr-fr/download/video/3042473/"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center px-8">
          <nav className="text-white/80 text-sm mb-4">
            <Link to="/" className="hover:underline">Accueil</Link> / <span>Animaux</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Prenez soin de vos compagnons
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
            Une protection claire et humaine pour leur santé, leurs soins et les imprévus du quotidien.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold px-8 py-6 rounded-xl hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/devis">Demander un accompagnement</Link>
          </Button>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pourquoi assurer votre animal ?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Les soins vétérinaires (consultations, examens, hospitalisation, chirurgie, médicaments) peuvent être
            coûteux et imprévisibles. Une couverture bien pensée vous permet d’agir vite, sereinement, et d’offrir à
            votre compagnon la meilleure prise en charge.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Nous analysons votre situation, le profil de votre animal et vos priorités (prévention, accidents,
            pathologies, assistance…) pour vous proposer une solution simple, lisible et efficace.
          </p>
        </div>
      </section>

      {/* ANIMAUX COUVERTS */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Animaux couverts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {animaux.map((animal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-3">{animal.icon}</div>
                <p className="font-semibold text-slate-900">{animal.name}</p>
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
          <h2 className="text-4xl font-bold text-white mb-6">Parlons de votre animal</h2>
          <p className="text-xl text-white/90 mb-8">
            Dites-nous qui il est, ses habitudes et vos attentes — on s’occupe du reste.
          </p>
          <Button
            size="lg"
            className="bg-white text-teal-600 hover:bg-slate-50 font-bold px-8 py-6 text-lg"
            asChild
          >
            <Link to="/devis">Commencer la demande</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}