import { motion } from 'framer-motion';
import { Heart, Shield, Home, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Heart,
    title: 'Santé',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Une couverture santé complète et personnalisée pour vous et votre famille',
    points: [
      '100% personnalisé',
      'Accès direct aux meilleurs soins',
      'Remboursements express'
    ],
    link: '/particuliers/sante'
  },
  {
    icon: Shield,
    title: 'Prévoyance',
    image: 'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Protégez votre famille et vos revenus face aux aléas de la vie',
    points: [
      'Revenus garantis en cas d\'imprévu',
      'Sécurité pour vos proches',
      'Solutions flexibles et modulables'
    ],
    link: '/particuliers/prevoyance'
  },
  {
    icon: Home,
    title: 'IARD',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Assurez vos biens et votre responsabilité avec des garanties adaptées',
    points: [
      'Assurance tout risque habitation et auto',
      'Couverture complète zéro tracas',
      'Assistance immédiate 24/7'
    ],
    link: '/particuliers/iard'
  }
];

export default function ValueProposition() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            Nos solutions
          </span>
          <h2 className="text-slate-900 text-5xl font-bold tracking-tight mb-4">
            Des assurances sur mesure, pensées pour vous
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Découvrez nos solutions d'assurance adaptées à vos besoins spécifiques
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden h-[580px] flex flex-col group"
              style={{
                transform: 'perspective(1000px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.4 }
              }}
            >
              {/* Image */}
              <div className="h-[260px] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Icon */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-10 h-10 text-teal-600" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-14 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Points */}
                <ul className="space-y-3 mb-6 flex-1">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link 
                  to={service.link}
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold group/link"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}