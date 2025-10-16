import { motion } from "framer-motion";

export default function Cookies() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Cookies et traceurs"
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
            Gestion des cookies
          </motion.h1>
          <p className="text-white/90 text-lg">
            Informations sur l’utilisation des cookies et traceurs sur le site Prévoyance Services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-8 py-20 space-y-12">
        {/* 1. Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">1. Qu’est-ce qu’un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur, tablette, smartphone)
            lorsque vous visitez un site web.  
            Il permet au site de reconnaître votre appareil et de conserver certaines informations sur vos préférences.
          </p>
        </motion.div>

        {/* 2. Types de cookies utilisés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">2. Types de cookies utilisés</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (authentification, sécurité, etc.).
            </li>
            <li>
              <strong>Cookies de performance :</strong> utilisés pour analyser le trafic et mesurer l’audience.
            </li>
            <li>
              <strong>Cookies de personnalisation :</strong> permettent d’adapter le contenu selon vos préférences.
            </li>
            <li>
              <strong>Cookies publicitaires :</strong> servent à afficher des publicités pertinentes selon vos centres d’intérêt.
            </li>
          </ul>
        </motion.div>

        {/* 3. Finalités des cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">3. Pourquoi utilisons-nous des cookies ?</h2>
          <p>
            Les cookies que nous utilisons ont pour finalités principales :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Assurer le bon fonctionnement du site</li>
            <li>Améliorer votre expérience utilisateur</li>
            <li>Analyser la fréquentation et les performances</li>
            <li>Proposer des contenus et offres personnalisées</li>
          </ul>
        </motion.div>

        {/* 4. Gestion des cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">4. Gestion et paramétrage de vos cookies</h2>
          <p>
            Lors de votre première visite sur le site, un bandeau d’information vous permet de consentir ou refuser
            l’utilisation de certains cookies.  
            Vous pouvez à tout moment modifier vos choix via les paramètres de votre navigateur :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Google Chrome : Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
            <li>Mozilla Firefox : Options &gt; Vie privée &gt; Cookies</li>
            <li>Safari : Préférences &gt; Confidentialité</li>
            <li>Edge : Paramètres &gt; Cookies et autorisations de site</li>
          </ul>
        </motion.div>

        {/* 5. Durée de conservation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">5. Durée de conservation des cookies</h2>
          <p>
            Les cookies déposés sur votre appareil sont conservés pour une durée maximale de 13 mois à compter de leur dépôt.
            Passé ce délai, votre consentement sera à nouveau demandé.
          </p>
        </motion.div>

        {/* 6. Vos droits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">6. Vos droits</h2>
          <p>
            Conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>,
            vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition
            sur les données collectées via les cookies.
          </p>
          <p className="mt-3">
            Pour toute demande, vous pouvez nous contacter à :
            <br />
            <strong>Email :</strong> dpo@prevoyanceservices.fr  
            <br />
            <strong>Adresse :</strong> Prévoyance Services – 12 Rue du Général de Gaulle, 92230 Gennevilliers.
          </p>
        </motion.div>
      </section>
    </main>
  );
}