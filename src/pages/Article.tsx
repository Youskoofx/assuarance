import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';

export default function Article() {
  const { slug } = useParams();

  // Mock article data - in real app, fetch from API/database
  const article = {
    title: 'Comment bien choisir sa mutuelle santé en 2025',
    category: 'Santé',
    date: '15 janvier 2025',
    author: 'Marie Dubois',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    content: `
      <p>Choisir une mutuelle santé adaptée à ses besoins est essentiel pour bénéficier d'une couverture optimale tout en maîtrisant son budget. Avec la multitude d'offres disponibles sur le marché, il peut être difficile de s'y retrouver. Voici nos conseils pour faire le bon choix.</p>

      <h2>1. Analysez vos besoins réels</h2>
      <p>Avant de comparer les offres, prenez le temps d'évaluer vos besoins en santé :</p>
      <ul>
        <li>Fréquence de vos consultations médicales</li>
        <li>Besoins en optique (lunettes, lentilles)</li>
        <li>Soins dentaires prévus (prothèses, orthodontie)</li>
        <li>Médecines douces (ostéopathie, acupuncture)</li>
        <li>Situation familiale (célibataire, couple, famille)</li>
      </ul>

      <h2>2. Comparez les garanties essentielles</h2>
      <p>Une bonne mutuelle doit couvrir au minimum :</p>
      <ul>
        <li><strong>Hospitalisation :</strong> chambre particulière, forfait journalier</li>
        <li><strong>Soins courants :</strong> consultations, analyses, médicaments</li>
        <li><strong>Dentaire :</strong> soins conservateurs et prothèses</li>
        <li><strong>Optique :</strong> verres, montures, lentilles</li>
        <li><strong>Prévention :</strong> vaccins, dépistages</li>
      </ul>

      <h2>3. Vérifiez les délais de carence</h2>
      <p>Certaines garanties ne sont pas actives immédiatement après la souscription. Les délais de carence varient selon les contrats :</p>
      <ul>
        <li>Soins courants : généralement aucun délai</li>
        <li>Hospitalisation : 0 à 3 mois</li>
        <li>Dentaire/Optique : 3 à 6 mois</li>
        <li>Maternité : 9 à 12 mois</li>
      </ul>

      <h2>4. Attention aux exclusions</h2>
      <p>Lisez attentivement les conditions générales pour identifier les exclusions de garanties. Certains contrats excluent :</p>
      <ul>
        <li>Les médecines alternatives</li>
        <li>Certains actes dentaires</li>
        <li>Les dépassements d'honoraires importants</li>
        <li>Les cures thermales</li>
      </ul>

      <h2>5. Comparez les tarifs et les services</h2>
      <p>Au-delà du prix, considérez :</p>
      <ul>
        <li>La qualité du service client</li>
        <li>Les délais de remboursement</li>
        <li>L'application mobile et l'espace client en ligne</li>
        <li>Le réseau de partenaires (tiers payant)</li>
        <li>Les services d'assistance (téléconsultation, second avis médical)</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Le choix d'une mutuelle santé doit être mûrement réfléchi. N'hésitez pas à faire appel à un courtier en assurance qui pourra vous guider vers l'offre la plus adaptée à votre situation et négocier les meilleures conditions pour vous.</p>

      <p><strong>Besoin d'aide pour choisir votre mutuelle ?</strong> Nos conseillers sont à votre disposition pour vous accompagner gratuitement dans votre recherche.</p>
    `
  };

  const relatedArticles = [
    {
      slug: 'prevoyance-pourquoi-essentielle',
      title: 'Pourquoi la prévoyance est essentielle',
      category: 'Prévoyance',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80'
    },
    {
      slug: 'mutuelle-senior-bien-choisir',
      title: 'Mutuelle senior : comment bien la choisir',
      category: 'Santé',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&q=80'
    },
    {
      slug: 'assurance-pro-tns',
      title: 'TNS : quelle assurance santé ?',
      category: 'Professionnel',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[60vh]">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <nav className="text-white/70 text-sm mb-4">
              <Link to="/" className="hover:text-white">Accueil</Link> / 
              <Link to="/actualites" className="hover:text-white"> Actualités</Link> / 
              <span className="text-white"> {article.title}</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-semibold text-teal-400">{article.category}</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{article.title}</h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Share Buttons */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-200">
            <p className="text-slate-600 font-semibold">Partager cet article :</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                <Share2 className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-slate-600 prose-li:mb-2 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA Box */}
          <div className="mt-16 p-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour choisir votre assurance ?</h3>
            <p className="text-white/90 mb-6">
              Nos conseillers vous accompagnent gratuitement dans votre recherche
            </p>
            <Button 
              size="lg"
              className="bg-white text-teal-600 hover:bg-slate-50 font-bold"
              asChild
            >
              <Link to="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Articles similaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((related, idx) => (
              <article key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-600">{related.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{related.title}</h3>
                  <Button 
                    className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
                    asChild
                  >
                    <Link to={`/actualites/${related.slug}`} className="flex items-center justify-center gap-2">
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
