import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = {
    sante: [
      {
        question: 'Quelle est la différence entre la Sécurité Sociale et une mutuelle ?',
        answer: 'La Sécurité Sociale rembourse une partie de vos frais médicaux selon un tarif de base. La mutuelle complète ces remboursements pour réduire ou supprimer votre reste à charge.'
      },
      {
        question: 'Puis-je changer de mutuelle à tout moment ?',
        answer: 'Oui, depuis la loi Chatel, vous pouvez résilier votre mutuelle à tout moment après la première année, avec un préavis d\'un mois.'
      },
      {
        question: 'Les soins dentaires sont-ils bien remboursés ?',
        answer: 'Cela dépend de votre formule. Les formules Confort et Premium offrent des remboursements élevés pour l\'orthodontie, les prothèses et les implants.'
      },
      {
        question: 'Combien de temps pour être remboursé ?',
        answer: 'En moyenne, vous êtes remboursé sous 48h après transmission de votre feuille de soins. Avec la télétransmission, c\'est encore plus rapide.'
      },
      {
        question: 'Puis-je ajouter mes enfants sur mon contrat ?',
        answer: 'Oui, vous pouvez souscrire une formule famille qui couvre votre conjoint et vos enfants à charge.'
      }
    ],
    prevoyance: [
      {
        question: 'À quoi sert une assurance prévoyance ?',
        answer: 'Elle protège vos proches en cas de décès, d\'invalidité ou d\'incapacité de travail. Elle garantit le maintien de revenus pour votre famille.'
      },
      {
        question: 'Quelle différence entre incapacité et invalidité ?',
        answer: 'L\'incapacité est temporaire (arrêt de travail), l\'invalidité est permanente et reconnue par la Sécurité Sociale après consolidation.'
      },
      {
        question: 'Le capital décès est-il imposable ?',
        answer: 'Non, le capital décès versé aux bénéficiaires est exonéré d\'impôts dans la limite de 152 500 € par bénéficiaire.'
      },
      {
        question: 'Puis-je choisir mes bénéficiaires ?',
        answer: 'Oui, vous désignez librement vos bénéficiaires lors de la souscription. Vous pouvez les modifier à tout moment.'
      },
      {
        question: 'Y a-t-il un délai de carence ?',
        answer: 'Oui, généralement 12 mois pour le décès (sauf accident) et 3 mois pour l\'incapacité de travail.'
      }
    ],
    iard: [
      {
        question: 'L\'assurance auto est-elle obligatoire ?',
        answer: 'Oui, au minimum la garantie responsabilité civile (formule Tiers) est obligatoire pour circuler en France.'
      },
      {
        question: 'Que couvre l\'assurance habitation ?',
        answer: 'Elle couvre les dommages à votre logement (incendie, dégâts des eaux, vol) et votre responsabilité civile vis-à-vis des tiers.'
      },
      {
        question: 'Comment fonctionne le bonus-malus ?',
        answer: 'Chaque année sans sinistre responsable, vous gagnez 5% de bonus. En cas de sinistre responsable, vous perdez du bonus (malus de 25%).'
      },
      {
        question: 'Puis-je assurer une voiture de collection ?',
        answer: 'Oui, nous proposons des contrats spécifiques pour les véhicules de collection avec des garanties adaptées.'
      },
      {
        question: 'Que faire en cas de sinistre ?',
        answer: 'Contactez-nous immédiatement. Nous vous accompagnons dans toutes les démarches : déclaration, expertise, suivi du dossier.'
      }
    ],
    general: [
      {
        question: 'Comment obtenir un devis ?',
        answer: 'Remplissez notre formulaire en ligne ou contactez-nous par téléphone. Vous recevrez une proposition sous 24h.'
      },
      {
        question: 'Vos services sont-ils payants ?',
        answer: 'Non, nos conseils et notre accompagnement sont totalement gratuits. Nous sommes rémunérés par les compagnies d\'assurance.'
      },
      {
        question: 'Puis-je gérer mes contrats en ligne ?',
        answer: 'Oui, votre espace client vous permet de consulter vos contrats, télécharger vos documents et faire vos demandes en ligne.'
      },
      {
        question: 'Combien de temps pour souscrire ?',
        answer: 'Une fois votre choix validé, votre contrat est actif sous 48h. Pour certaines garanties, un délai de carence peut s\'appliquer.'
      },
      {
        question: 'Puis-je résilier mon contrat ?',
        answer: 'Oui, selon la loi Hamon, vous pouvez résilier à tout moment après la première année, sans frais ni pénalités.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <span className="text-white">FAQ</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Questions Fréquentes</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Trouvez rapidement les réponses à vos questions sur nos assurances
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-slate-300 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ Tabs */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="sante" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-slate-100 p-2 rounded-xl">
              <TabsTrigger value="sante" className="text-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-teal-600">
                Santé
              </TabsTrigger>
              <TabsTrigger value="prevoyance" className="text-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-teal-600">
                Prévoyance
              </TabsTrigger>
              <TabsTrigger value="iard" className="text-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-teal-600">
                IARD
              </TabsTrigger>
              <TabsTrigger value="general" className="text-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-teal-600">
                Général
              </TabsTrigger>
            </TabsList>

            {Object.entries(faqData).map(([key, questions]) => (
              <TabsContent key={key} value={key}>
                <Accordion type="single" collapsible className="space-y-4">
                  {questions
                    .filter(faq => 
                      searchQuery === '' || 
                      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((faq, idx) => (
                      <AccordionItem key={idx} value={`${key}-${idx}`} className="bg-white rounded-xl shadow-md px-6">
                        <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-teal-600">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Pas trouvé de réponse ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Nos conseillers sont là pour vous aider
          </p>
          <Button 
            size="lg"
            className="bg-white text-teal-600 hover:bg-slate-50 font-bold px-8 py-6 text-lg"
            asChild
          >
            <Link to="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
