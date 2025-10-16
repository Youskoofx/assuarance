import { motion } from "framer-motion";

export default function CGU() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Conditions Générales d’Utilisation"
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
            Conditions Générales d’Utilisation
          </motion.h1>
          <p className="text-white/90 text-lg">
            Les règles d’utilisation du site Prévoyance Services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-8 py-20 space-y-12">
        {/* Article 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet de définir les modalités d’accès et
            d’utilisation du site <strong>prevoyanceservices.fr</strong>, exploité par la société Prévoyance Services.
          </p>
        </motion.div>

        {/* Article 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">2. Acceptation des conditions</h2>
          <p>
            En naviguant sur le site, l’utilisateur reconnaît avoir lu, compris et accepté les présentes CGU.
            En cas de désaccord, il lui appartient de cesser toute utilisation du site.
          </p>
        </motion.div>

        {/* Article 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">3. Accès au site</h2>
          <p>
            Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.
            Tous les coûts liés à la connexion (matériel, logiciels, frais d’accès, etc.) sont à la charge de l’utilisateur.
          </p>
        </motion.div>

        {/* Article 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">4. Utilisation du contenu</h2>
          <p>
            Le contenu du site (textes, images, logos, vidéos, documents) est protégé par le droit d’auteur et demeure la
            propriété exclusive de Prévoyance Services ou de ses partenaires.
            Toute reproduction ou diffusion non autorisée est strictement interdite.
          </p>
        </motion.div>

        {/* Article 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">5. Responsabilité</h2>
          <p>
            Prévoyance Services s’efforce de fournir des informations exactes, mais ne garantit ni leur exhaustivité ni leur
            actualité. L’entreprise ne saurait être tenue responsable des dommages directs ou indirects liés à l’utilisation
            du site ou à l’impossibilité d’y accéder.
          </p>
        </motion.div>

        {/* Article 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">6. Données personnelles</h2>
          <p>
            Le traitement des données personnelles collectées sur ce site est effectué conformément à notre{" "}
            <a href="/politique-confidentialite" className="text-teal-600 underline">
              Politique de confidentialité
            </a>.
          </p>
        </motion.div>

        {/* Article 7 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">7. Liens externes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers. Prévoyance Services n’exerce aucun contrôle sur ces sites
            et décline toute responsabilité quant à leur contenu ou à leur politique de confidentialité.
          </p>
        </motion.div>

        {/* Article 8 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">8. Modification des CGU</h2>
          <p>
            Prévoyance Services se réserve le droit de modifier les présentes conditions à tout moment.
            La version applicable est celle en vigueur à la date de votre connexion au site.
          </p>
        </motion.div>

        {/* Article 9 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">9. Droit applicable</h2>
          <p>
            Les présentes CGU sont régies par le droit français.
            Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents de Paris.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
