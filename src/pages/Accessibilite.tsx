import { motion } from "framer-motion";

export default function Accessibilite() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Accessibilité numérique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-cyan-600/70" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Accessibilité du site
          </motion.h1>
          <p className="text-white/90 text-lg">
            Notre engagement pour un web inclusif et accessible à tous.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-8 py-20 space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">1. Notre engagement</h2>
          <p>
            Prévoyance Services s’engage à rendre son site internet accessible à tous les utilisateurs,
            y compris les personnes en situation de handicap, conformément au
            <strong> Référentiel Général d’Amélioration de l’Accessibilité (RGAA 4.1)</strong>.
          </p>
        </motion.div>

        {/* Déclaration d’accessibilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">2. Déclaration d’accessibilité</h2>
          <p>
            Cette déclaration d’accessibilité s’applique au site{" "}
            <a href="https://prevoyanceservices.fr" className="text-teal-600 underline">
              prevoyanceservices.fr
            </a>.
          </p>
          <p className="mt-3">
            Nous nous efforçons de garantir un niveau d’accessibilité conforme au RGAA
            et de corriger les éventuels défauts constatés dans les meilleurs délais.
          </p>
        </motion.div>

        {/* Niveau de conformité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">3. Niveau de conformité</h2>
          <p>
            À ce jour, le site{" "}
            <strong>est partiellement conforme au RGAA 4.1</strong>, 
            en raison de certaines non-conformités identifiées.
            Nous travaillons activement pour les corriger.
          </p>
        </motion.div>

        {/* Améliorations continues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">4. Amélioration continue</h2>
          <p>
            Nous améliorons en permanence l’accessibilité du site à travers :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Des audits réguliers par nos équipes techniques</li>
            <li>Une intégration accessible (balises ARIA, contrastes, navigation clavier)</li>
            <li>Des tests utilisateurs incluant des personnes en situation de handicap</li>
          </ul>
        </motion.div>

        {/* Assistance utilisateur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">5. Assistance et contact</h2>
          <p>
            Si vous rencontrez une difficulté d’accès à un contenu ou à un service du site, 
            vous pouvez nous contacter pour obtenir une assistance :
          </p>
          <ul className="mt-3">
            <li>
              <strong>Email :</strong> accessibilite@prevoyanceservices.fr
            </li>
            <li>
              <strong>Téléphone :</strong> 01 84 21 83 93
            </li>
            <li>
              <strong>Adresse :</strong> 12 Rue du Général de Gaulle, 92230 Gennevilliers
            </li>
          </ul>
        </motion.div>

        {/* Voies de recours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">6. Voies de recours</h2>
          <p>
            Si vous constatez un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à une fonctionnalité du site,
            et que vous ne parvenez pas à obtenir une réponse satisfaisante de notre part, 
            vous pouvez adresser une réclamation au{" "}
            <a href="https://www.defenseurdesdroits.fr" className="text-teal-600 underline">
              Défenseur des droits
            </a>.
          </p>
        </motion.div>
      </section>
    </main>
  );
}