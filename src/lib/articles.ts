import type { Database } from '@/types/supabase'
import { stripHtml } from './text'

export type ArticleRecord = Database['public']['Tables']['articles']['Row']

const articleDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function sortArticles(items: ArticleRecord[]) {
  return [...items].sort((a, b) => {
    const aDate = new Date(a.published_at ?? a.created_at ?? 0).getTime()
    const bDate = new Date(b.published_at ?? b.created_at ?? 0).getTime()
    return bDate - aDate
  })
}

export function formatArticleDate(article: ArticleRecord) {
  const raw = article.published_at ?? article.created_at
  if (!raw) return 'Date à venir'
  return articleDateFormatter.format(new Date(raw))
}

export function getArticleExcerpt(article: ArticleRecord, maxLength = 200) {
  if (article.excerpt?.trim()) {
    const trimmed = article.excerpt.trim()
    return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength)}...` : trimmed
  }

  const clean = stripHtml(article.content ?? '')
  if (!clean) return ''
  return clean.length > maxLength ? `${clean.slice(0, maxLength)}...` : clean
}

export function findRelatedArticles(
  base: ArticleRecord,
  pool: ArticleRecord[],
  limit = 3
) {
  const filtered = pool.filter((item) => item.slug !== base.slug)

  const sameCategory = filtered.filter(
    (item) =>
      !!base.category &&
      !!item.category &&
      item.category.toLowerCase() === base.category.toLowerCase()
  )

  if (sameCategory.length >= limit) {
    return sortArticles(sameCategory).slice(0, limit)
  }

  const remaining = filtered.filter(
    (item) => !base.category || item.category?.toLowerCase() !== base.category.toLowerCase()
  )

  return sortArticles([...sameCategory, ...remaining]).slice(0, limit)
}

export const demoArticles: ArticleRecord[] = [
  {
    id: 'demo-article-1',
    slug: 'comment-choisir-mutuelle-sante',
    title: 'Comment bien choisir sa mutuelle santé en 2025',
    category: 'Santé',
    excerpt:
      'Découvrez nos conseils pour sélectionner la mutuelle santé qui correspond vraiment à vos besoins et à votre budget.',
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
    `,
    cover_url:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80&auto=format&fit=crop',
    thumbnail_url:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop',
    tags: ['Mutuelle', 'Santé', 'Conseils'],
    author_id: null,
    author_name: 'Marie Dubois',
    is_published: true,
    published_at: '2025-01-15T08:00:00Z',
    created_at: '2025-01-15T08:00:00Z',
    updated_at: '2025-01-15T08:00:00Z',
  },
  {
    id: 'demo-article-2',
    slug: 'prevoyance-pourquoi-essentielle',
    title: 'Pourquoi la prévoyance est essentielle pour protéger votre famille',
    category: 'Prévoyance',
    excerpt:
      "Protéger ses proches en cas d'imprévu : comprendre l'importance d'une assurance prévoyance adaptée.",
    content: `
      <p>Une assurance prévoyance vous permet de protéger financièrement votre famille en cas d'aléas de la vie : décès, invalidité, incapacité de travail ou perte totale d'autonomie. Trop souvent négligée, elle peut pourtant éviter une baisse brutale de revenus et sécuriser l'avenir de vos proches.</p>

      <h2>Les risques couverts par la prévoyance</h2>
      <ul>
        <li><strong>Décès :</strong> versement d'un capital ou d'une rente aux bénéficiaires désignés.</li>
        <li><strong>Invalidité :</strong> compensation de la perte de revenus en cas d'invalidité partielle ou totale.</li>
        <li><strong>Incapacité de travail :</strong> indemnités pour maintenir votre niveau de vie pendant un arrêt.</li>
        <li><strong>Perte d'autonomie :</strong> financement de l'aide à domicile ou d'une maison spécialisée.</li>
      </ul>

      <h2>Comment dimensionner sa prévoyance ?</h2>
      <p>Pour choisir le bon niveau de couverture, tenez compte :</p>
      <ul>
        <li>De vos revenus actuels et de vos charges fixes (crédit, loyer, scolarité, etc.).</li>
        <li>Du niveau de protection déjà proposé par votre employeur ou votre caisse de retraite.</li>
        <li>De la situation de votre conjoint (revenus, statut professionnel, santé).</li>
        <li>Du nombre d'enfants et de leur âge.</li>
      </ul>

      <h2>Prévoyance et travailleurs indépendants</h2>
      <p>Les TNS sont particulièrement exposés puisqu'ils bénéficient d'une couverture de base très limitée. Une prévoyance sur-mesure permet de compenser la perte de revenus et de maintenir la trésorerie de l'entreprise en cas de coup dur.</p>

      <p>N'oubliez pas de réviser votre contrat tous les 3 ans ou à chaque changement de situation (mariage, naissance, achat immobilier...).</p>
    `,
    cover_url:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80&auto=format&fit=crop',
    thumbnail_url:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80&auto=format&fit=crop',
    tags: ['Prévoyance', 'Famille', 'Protection'],
    author_id: null,
    author_name: 'Jean Martin',
    is_published: true,
    published_at: '2025-01-12T08:00:00Z',
    created_at: '2025-01-12T08:00:00Z',
    updated_at: '2025-01-12T08:00:00Z',
  },
  {
    id: 'demo-article-3',
    slug: 'assurance-auto-jeunes-conducteurs',
    title: 'Assurance auto : 7 conseils pour jeunes conducteurs',
    category: 'Auto',
    excerpt:
      'Jeune conducteur ? Découvrez comment réduire le coût de votre assurance auto tout en restant bien protégé.',
    content: `
      <p>La première assurance auto d'un jeune conducteur peut rapidement coûter cher en raison du manque d'expérience au volant. Voici 7 conseils pour optimiser votre contrat tout en conservant de bonnes garanties.</p>

      <h2>1. Comparez plusieurs devis</h2>
      <p>Les assureurs appliquent des politiques tarifaires différentes selon le profil et la zone géographique. Demandez au moins trois devis pour comparer les prix et les garanties.</p>

      <h2>2. Choisissez le bon véhicule</h2>
      <p>Les véhicules puissants, sportifs ou très récents coûtent plus cher à assurer. Privilégiez un modèle raisonnable, bien entretenu et équipé d'aides à la conduite.</p>

      <h2>3. Optez pour la conduite accompagnée</h2>
      <p>Un conducteur ayant suivi une conduite accompagnée bénéficie souvent d'une remise allant jusqu'à 30 % sur sa prime la première année.</p>

      <h2>4. Mise en place de franchises adaptées</h2>
      <p>Augmenter légèrement la franchise peut réduire le montant de la prime mensuelle. Assurez-vous simplement de pouvoir couvrir cette franchise en cas de sinistre.</p>

      <h2>5. Bonus de fidélité et options de paiement</h2>
      <p>La mensualisation sans frais, le paiement annuel et les options de parrainage peuvent générer des économies supplémentaires sur la durée.</p>

      <p>Enfin, pensez à réévaluer votre contrat chaque année : votre bonus évolue, votre situation aussi. L'objectif est d'ajuster vos garanties sans surpayer.</p>
    `,
    cover_url:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80&auto=format&fit=crop',
    thumbnail_url:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop',
    tags: ['Auto', 'Jeunes conducteurs', 'Budget'],
    author_id: null,
    author_name: 'Sophie Laurent',
    is_published: true,
    published_at: '2025-01-10T08:00:00Z',
    created_at: '2025-01-10T08:00:00Z',
    updated_at: '2025-01-10T08:00:00Z',
  },
  {
    id: 'demo-article-4',
    slug: 'assurance-habitation-locataire',
    title: 'Assurance habitation : ce que doit savoir un locataire',
    category: 'Habitation',
    excerpt:
      "Locataire ? Votre assurance habitation est obligatoire. Voici tout ce qu'il faut savoir pour être bien couvert.",
    content: `
      <p>L'assurance habitation est obligatoire pour tout locataire, qu'il s'agisse d'un logement vide ou meublé. Elle protège le propriétaire, mais surtout votre responsabilité en cas de dommages causés au logement ou aux voisins.</p>

      <h2>Les garanties indispensables</h2>
      <ul>
        <li><strong>Responsabilité civile locative :</strong> couvre les dégâts causés à l'habitation.</li>
        <li><strong>Dégâts des eaux :</strong> prend en charge les réparations suite à une fuite.</li>
        <li><strong>Incendie et explosion :</strong> couvre les dommages matériels et corporels.</li>
        <li><strong>Vol et vandalisme :</strong> indemnisation en cas d'effraction ou de tentative.</li>
      </ul>

      <h2>Options à envisager</h2>
      <p>Selon la valeur de vos biens, souscrivez des garanties complémentaires :</p>
      <ul>
        <li>Protection des appareils électriques contre la surtension.</li>
        <li>Assurance des objets de valeur ou instruments de travail.</li>
        <li>Responsabilité civile vie privée étendue à toute la famille.</li>
      </ul>

      <p>Conservez toujours une copie de votre contrat, les factures des biens importants et des photos pour faciliter l'indemnisation en cas de sinistre.</p>
    `,
    cover_url:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format&fit=crop',
    thumbnail_url:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop',
    tags: ['Habitation', 'Locataires', 'Protection'],
    author_id: null,
    author_name: 'Pierre Durand',
    is_published: true,
    published_at: '2025-01-08T08:00:00Z',
    created_at: '2025-01-08T08:00:00Z',
    updated_at: '2025-01-08T08:00:00Z',
  },
]
