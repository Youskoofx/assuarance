import { motion } from "framer-motion";

export default function MentionsLegales() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Mentions légales"
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
            Mentions légales
          </motion.h1>
          <p className="text-white/90 text-lg">
            Informations légales et conditions d’utilisation du site Prévoyance Services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-8 py-20 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">1. Éditeur du site</h2>
          <p>
            Le présent site est édité par <strong>Prévoyance Services</strong>, société spécialisée en courtage d’assurance.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Raison sociale :</strong> Prévoyance Services</li>
            <li><strong>Forme juridique :</strong> SARL</li>
            <li><strong>Adresse :</strong> 12 Rue du Général de Gaulle, 92230 Gennevilliers, France</li>
            <li><strong>Téléphone :</strong> 01 84 21 83 93</li>
            <li><strong>Email :</strong> contact@prevoyanceservices.fr</li>
            <li><strong>SIRET :</strong> 912 456 789 00027</li>
            <li><strong>Directeur de la publication :</strong> Youssouph Kamara</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">2. Hébergeur du site</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Nom :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
            <li><strong>Site web :</strong> <a href="https://vercel.com" className="text-teal-600 underline">vercel.com</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">3. Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu présent sur le site (textes, images, graphismes, logos, vidéos, etc.) est la propriété exclusive
            de Prévoyance Services, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation écrite
            est strictement interdite.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">4. Protection des données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification,
            de suppression et d’opposition sur vos données personnelles.  
            Pour exercer vos droits, vous pouvez nous contacter à l’adresse suivante :
          </p>
          <p className="mt-3">
            <strong>Email :</strong> dpo@prevoyanceservices.fr  
            <br />
            <strong>Adresse :</strong> Prévoyance Services – Délégué à la protection des données – 12 Rue du Général de Gaulle, 92230 Gennevilliers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">5. Responsabilité</h2>
          <p>
            Prévoyance Services s’efforce d’assurer l’exactitude des informations diffusées sur ce site.  
            Toutefois, elle ne saurait être tenue responsable d’éventuelles erreurs, omissions ou indisponibilités du service.
          </p>
        </motion.div>
      </section>
    </main>
  );
}