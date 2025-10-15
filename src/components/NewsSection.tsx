import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    title: 'Comment profiter du remboursement de l\'homéopathie ?',
    image: 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt: 'Découvrez comment optimiser vos remboursements pour les traitements homéopathiques et médecines douces.',
    date: '15 Mars 2024',
    readTime: '5 min'
  },
  {
    title: 'Remboursement des séances de massothérapie : ce qu\'il faut savoir',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt: 'Tout savoir sur la prise en charge des séances de massage thérapeutique par votre mutuelle santé.',
    date: '10 Mars 2024',
    readTime: '4 min'
  },
  {
    title: 'La médecine chinoise : Guide et solutions',
    image: 'https://images.pexels.com/photos/7195133/pexels-photo-7195133.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt: 'Les solutions d\'assurance pour vos consultations en médecine traditionnelle chinoise et acupuncture.',
    date: '5 Mars 2024',
    readTime: '6 min'
  }
];

export default function NewsSection() {
  return (
    <section className="py-24 bg-white">
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
            Actualités
          </span>
          <h2 className="text-slate-900 text-5xl font-bold tracking-tight mb-4">
            Restez informé des nouveautés !
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Explorez les dernières actualités et conseils de votre courtier d'assurances à Gennevilliers
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-[520px] flex flex-col group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="text-[#2DD4BF] font-semibold">{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                {/* CTA */}
                <button className="flex items-center gap-2 text-[#2DD4BF] hover:text-[#0891B2] font-semibold group/btn">
                  Lire la suite
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}