import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export default function Actualites() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const articles = [
    {
      slug: 'comment-choisir-mutuelle-sante',
      title: 'Comment bien choisir sa mutuelle santé en 2025',
      category: 'Santé',
      excerpt: 'Découvrez nos conseils pour sélectionner la mutuelle santé qui correspond vraiment à vos besoins et à votre budget.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      date: '15 janvier 2025',
      author: 'Marie Dubois'
    },
    {
      slug: 'prevoyance-pourquoi-essentielle',
      title: 'Pourquoi la prévoyance est essentielle pour votre famille',
      category: 'Prévoyance',
      excerpt: 'Protéger ses proches en cas d\'imprévu : comprendre l\'importance d\'une assurance prévoyance adaptée.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
      date: '12 janvier 2025',
      author: 'Jean Martin'
    },
    {
      slug: 'assurance-auto-jeunes-conducteurs',
      title: 'Assurance auto : conseils pour jeunes conducteurs',
      category: 'Auto',
      excerpt: 'Jeune conducteur ? Découvrez comment réduire le coût de votre assurance auto tout en restant bien protégé.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      date: '10 janvier 2025',
      author: 'Sophie Laurent'
    },
    {
      slug: 'assurance-habitation-locataire',
      title: 'Assurance habitation : ce que doit savoir un locataire',
      category: 'Habitation',
      excerpt: 'Locataire ? Votre assurance habitation est obligatoire. Voici tout ce qu\'il faut savoir pour être bien couvert.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      date: '8 janvier 2025',
      author: 'Pierre Durand'
    },
    {
      slug: 'sante-animaux-prevention',
      title: 'Santé animale : l\'importance de la prévention',
      category: 'Animaux',
      excerpt: 'Vaccins, vermifuges, détartrage : comment la prévention peut vous faire économiser sur les frais vétérinaires.',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80',
      date: '5 janvier 2025',
      author: 'Dr. Claire Petit'
    },
    {
      slug: 'teletravail-assurance-habitation',
      title: 'Télétravail : faut-il adapter son assurance habitation ?',
      category: 'Habitation',
      excerpt: 'Le télétravail change vos besoins en assurance. Découvrez les garanties à vérifier pour travailler sereinement.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      date: '3 janvier 2025',
      author: 'Marie Dubois'
    },
    {
      slug: 'bonus-malus-assurance-auto',
      title: 'Comprendre le système bonus-malus en assurance auto',
      category: 'Auto',
      excerpt: 'Comment fonctionne le bonus-malus ? Nos explications pour optimiser votre coefficient et réduire vos cotisations.',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
      date: '28 décembre 2024',
      author: 'Jean Martin'
    },
    {
      slug: 'mutuelle-senior-bien-choisir',
      title: 'Mutuelle senior : comment bien la choisir après 60 ans',
      category: 'Santé',
      excerpt: 'Après 60 ans, vos besoins en santé évoluent. Découvrez les garanties essentielles pour une mutuelle senior adaptée.',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80',
      date: '22 décembre 2024',
      author: 'Sophie Laurent'
    },
    {
      slug: 'assurance-pro-tns',
      title: 'TNS : quelle assurance santé pour les indépendants ?',
      category: 'Professionnel',
      excerpt: 'Travailleur non salarié ? Découvrez les spécificités de l\'assurance santé TNS et comment bien vous protéger.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      date: '18 décembre 2024',
      author: 'Pierre Durand'
    }
  ];

  const categories = ['Tous', 'Santé', 'Prévoyance', 'Auto', 'Habitation', 'Animaux', 'Professionnel'];
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredArticles = selectedCategory === 'Tous' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <span className="text-white">Actualités</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Actualités & Conseils</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Restez informé sur l'assurance avec nos articles, guides et conseils d'experts
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article, idx) => (
              <article key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-600">{article.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
                    asChild
                  >
                    <Link to={`/actualites/${article.slug}`} className="flex items-center justify-center gap-2">
                      Lire la suite
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
   
    </div>
  );
}
