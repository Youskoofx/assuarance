import { motion } from "framer-motion";

export default function PolitiqueConfidentialite() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184649/pexels-photo-3184649.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Politique de confidentialité"
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
            Politique de confidentialité
          </motion.h1>
          <p className="text-white/90 text-lg">
            Découvrez comment Prévoyance Services protège vos données personnelles.
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
          <h2 className="text-2xl font-bold text-teal-600 mb-3">1. Introduction</h2>
          <p>
            Prévoyance Services attache une grande importance à la protection de vos données personnelles.  
            Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations,
            conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong> et à la loi française.
          </p>
        </motion.div>

        {/* Données collectées */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">2. Données que nous collectons</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nom, prénom et coordonnées (téléphone, adresse e-mail, adresse postale)</li>
            <li>Informations nécessaires à la souscription ou à la gestion de votre contrat</li>
            <li>Données de navigation sur notre site (cookies, pages visitées, adresse IP)</li>
          </ul>
        </motion.div>

        {/* Utilisation des données */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">3. Utilisation de vos données</h2>
          <p>
            Vos données sont utilisées dans le cadre suivant :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Gestion de vos demandes de devis ou de contact</li>
            <li>Suivi de la relation client et exécution de vos contrats</li>
            <li>Envoi d’informations ou d’offres pertinentes (avec votre consentement)</li>
            <li>Amélioration de l’expérience utilisateur sur notre site</li>
          </ul>
        </motion.div>

        {/* Sécurité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">4. Sécurité et conservation des données</h2>
          <p>
            Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité,
            la confidentialité et l’intégrité de vos données personnelles.
            Vos informations sont hébergées sur des serveurs sécurisés situés dans l’Union Européenne.
          </p>
        </motion.div>

        {/* Partage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">5. Partage des données</h2>
          <p>
            Vos données ne sont jamais vendues.  
            Elles peuvent être partagées uniquement avec :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Nos partenaires assureurs dans le cadre de la gestion de vos contrats</li>
            <li>Nos prestataires techniques (hébergement, maintenance, etc.)</li>
            <li>Les autorités compétentes si la loi l’exige</li>
          </ul>
        </motion.div>

        {/* Droits RGPD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">6. Vos droits</h2>
          <p>
            Vous disposez des droits suivants sur vos données :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Droit d’accès, de rectification et de suppression</li>
            <li>Droit à la portabilité et à la limitation du traitement</li>
            <li>Droit d’opposition au traitement de vos données</li>
            <li>Droit de retrait de votre consentement à tout moment</li>
          </ul>
          <p className="mt-3">
            Pour exercer vos droits, contactez-nous à :
            <br />
            <strong>Email :</strong> dpo@prevoyanceservices.fr  
            <br />
            <strong>Adresse :</strong> Prévoyance Services – 12 Rue du Général de Gaulle, 92230 Gennevilliers.
          </p>
        </motion.div>

        {/* Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">7. Cookies</h2>
          <p>
            Le site utilise des cookies afin d’améliorer votre expérience de navigation et de mesurer l’audience.
            Vous pouvez les paramétrer à tout moment dans les réglages de votre navigateur.
          </p>
        </motion.div>

        {/* Mise à jour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">8. Mise à jour de la politique</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour pour refléter les évolutions légales ou techniques.
            Dernière mise à jour : <strong>Octobre 2025</strong>.
          </p>
        </motion.div>
      </section>
    </main>
  );
}