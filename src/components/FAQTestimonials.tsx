import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

const faqs = [
  {
    question: 'Quelle est la différence entre une mutuelle santé et une assurance santé ?',
    answer: 'Une mutuelle santé est un organisme à but non lucratif qui complète les remboursements de la Sécurité sociale, tandis qu\'une assurance santé est proposée par une compagnie d\'assurance privée avec des garanties similaires.'
  },
  {
    question: 'Pourquoi souscrire une mutuelle santé senior ?',
    answer: 'Avec l\'âge, les besoins en santé augmentent. Une mutuelle senior offre des garanties renforcées pour les soins courants, l\'hospitalisation, l\'optique et le dentaire, adaptées aux besoins spécifiques des seniors.'
  },
  {
    question: 'Comment une assurance prévoyance protège-t-elle votre famille en cas d\'accident ?',
    answer: 'L\'assurance prévoyance garantit le versement d\'un capital ou d\'une rente à vos proches en cas de décès ou d\'invalidité, assurant ainsi leur sécurité financière.'
  },
  {
    question: 'Quels types de garanties peuvent offrir une mutuelle santé ?',
    answer: 'Une mutuelle santé peut couvrir les consultations médicales, l\'hospitalisation, les médicaments, l\'optique, le dentaire, les médecines douces et bien plus selon le contrat choisi.'
  },
  {
    question: 'Pourquoi choisir un courtier pour vos démarches d\'assurance ?',
    answer: 'Un courtier compare les offres de multiples assureurs pour vous proposer la solution la plus adaptée à vos besoins et votre budget, tout en vous accompagnant dans vos démarches.'
  }
];

const testimonials = [
  {
    name: 'Yanis Djahnit',
    text: 'Accueil très chaleureux et suivi au top !',
    rating: 5
  },
  {
    name: 'Alhann-Ruben ODI',
    text: 'L\'accueil et le suivi est au rendez-vous. Je recommande',
    rating: 5
  },
  {
    name: 'Fathia El azzouzi',
    text: 'Top top top',
    rating: 5
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-slate-200 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        className={`w-full py-6 flex items-center justify-between text-left transition-colors ${
          isOpen ? 'text-[#2DD4BF] font-semibold' : 'hover:text-[#2DD4BF]'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-6 text-slate-700 leading-relaxed">
          {answer}
        </p>
      </div>
    </motion.div>
  );
}

export default function FAQTestimonials() {
  return (
    <>
      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Sticky */}
            <motion.div
              className="lg:sticky lg:top-32 h-fit"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                Essentiel
              </span>
              <h2 className="text-slate-900 text-5xl font-bold tracking-tight mb-4">
                Tout savoir sur l'assurance
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Les réponses à vos questions les plus fréquentes pour vous aider à faire le bon choix
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Conseiller professionnel"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right Column - Accordion */}
            <div className="bg-white rounded-2xl p-8">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
              Ils nous font confiance
            </span>
            <h2 className="text-slate-900 text-5xl font-bold tracking-tight mb-4">
              Ce que disent nos clients
            </h2>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-2">
              <span>EXCELLENT</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>4.5/5</span>
            </div>
            <p className="text-gray-600">Basée sur 10 avis Google</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white shadow-lg rounded-2xl p-8 h-[280px] flex flex-col justify-between relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="absolute top-4 right-4 text-6xl text-[#2DD4BF]/20 leading-none">"</div>
                
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-[#2DD4BF] font-bold text-xl">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">Client vérifié</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}