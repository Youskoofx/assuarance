import { motion } from "framer-motion";

export default function MentionsLegales() {
  return (
    <main className="bg-white text-slate-800 overflow-x-clip">
      {/* Hero */}
      <section className="relative h-[34vh] min-h-[220px] md:h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Mentions légales"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-cyan-600/70" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4"
          >
            Mentions légales
          </motion.h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Informations légales et conditions d’utilisation du site Prévoyance Services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20">
        {/* Vue mobile */}
        <div className="md:hidden space-y-4 [&_li]:break-words [&_p]:break-words">
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
            <h2 className="text-lg font-bold text-teal-700 mb-2">1. Éditeur du site</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Raison sociale :</strong> Prévoyance Services</li>
              <li><strong>Forme juridique :</strong> SARL</li>
              <li><strong>Adresse :</strong> 12 Rue du Général de Gaulle, 92230 Gennevilliers, France</li>
              <li><strong>Téléphone :</strong> 01 84 21 83 93</li>
              <li><strong>Email :</strong> contact@prevoyanceservices.fr</li>
              <li><strong>SIRET :</strong> 912 456 789 00027</li>
              <li><strong>SIREN :</strong> 912 456 789</li>
              <li><strong>RCS :</strong> A compléter (numéro + ville du greffe, ex. RCS Nanterre)</li>
              <li><strong>Capital social :</strong> A compléter</li>
              <li><strong>TVA intracommunautaire :</strong> A compléter (ou mention de non-assujettissement à la TVA)</li>
              <li><strong>Directeur de la publication :</strong> Youssouph Kamara</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 bg-white">
            <h2 className="text-lg font-bold text-teal-700 mb-2">2. Hébergeur du site</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Nom :</strong> Hostinger International Ltd.</li>
              <li><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
              <li><strong>Site web :</strong> <a href="https://www.hostinger.com" className="text-teal-600 underline">hostinger.com</a></li>
            </ul>
          </div>

          <details className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
            <summary className="text-lg font-bold text-teal-700 cursor-pointer">3. Activité de courtage en assurance</summary>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li><strong>Statut :</strong> Courtier en assurance</li>
              <li><strong>Immatriculation ORIAS :</strong> A compléter</li>
              <li><strong>Autorité de contrôle :</strong> ACPR, 4 Place de Budapest, CS 92459, 75436 Paris Cedex 09</li>
              <li><strong>Assurance RC professionnelle :</strong> A compléter</li>
              <li><strong>Garantie financière :</strong> A compléter (si encaissement de fonds)</li>
              <li><strong>Liens capitalistiques avec des assureurs :</strong> A compléter (existence ou absence de liens)</li>
            </ul>
          </details>

          <details className="rounded-2xl border border-slate-200 p-4 bg-white">
            <summary className="text-lg font-bold text-teal-700 cursor-pointer">4. Propriété intellectuelle</summary>
            <p className="text-sm mt-3">
              L’ensemble du contenu présent sur le site (textes, images, graphismes, logos, vidéos, etc.) est la propriété
              exclusive de Prévoyance Services, sauf mention contraire.
            </p>
          </details>

          <details className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
            <summary className="text-lg font-bold text-teal-700 cursor-pointer">5. Protection des données personnelles</summary>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li><strong>Finalités :</strong> devis/contact, gestion contrats, suivi client.</li>
              <li><strong>Bases légales :</strong> exécution contractuelle, obligations légales, consentement, intérêt légitime.</li>
              <li><strong>Durée de conservation :</strong> A compléter selon la politique interne et les obligations légales.</li>
              <li><strong>Droit de réclamation :</strong> CNIL (www.cnil.fr).</li>
              <li>
                <strong>Politique de confidentialité :</strong>{" "}
                <a href="/politique-confidentialite" className="text-teal-600 underline">
                  consulter la politique complète
                </a>
              </li>
            </ul>
            <p className="text-sm mt-3">
              <strong>Email :</strong> dpo@prevoyanceservices.fr
              <br />
              <strong>Adresse :</strong> 12 Rue du Général de Gaulle, 92230 Gennevilliers.
            </p>
          </details>

          <details className="rounded-2xl border border-slate-200 p-4 bg-white">
            <summary className="text-lg font-bold text-teal-700 cursor-pointer">6. Transfert de données hors UE</summary>
            <p className="text-sm mt-3">
              Certaines données peuvent être traitées en dehors de l’Union européenne par des prestataires techniques.
              Ces transferts sont encadrés par des garanties juridiques appropriées, incluant les clauses contractuelles types.
            </p>
          </details>

          <details className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
            <summary className="text-lg font-bold text-teal-700 cursor-pointer">7. Responsabilité</summary>
            <p className="text-sm mt-3">
              Prévoyance Services s’efforce d’assurer l’exactitude des informations diffusées sur ce site.
            </p>
          </details>
        </div>

        {/* Vue desktop/tablette */}
        <div className="hidden md:block space-y-12 [&_li]:break-words [&_p]:break-words">
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
            <li><strong>SIREN :</strong> 912 456 789</li>
            <li><strong>RCS :</strong> A compléter (numéro + ville du greffe, ex. RCS Nanterre)</li>
            <li><strong>Capital social :</strong> A compléter</li>
            <li><strong>TVA intracommunautaire :</strong> A compléter (ou mention de non-assujettissement à la TVA)</li>
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
            <li><strong>Nom :</strong> Hostinger International Ltd.</li>
            <li><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
            <li><strong>Site web :</strong> <a href="https://www.hostinger.com" className="text-teal-600 underline">hostinger.com</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">3. Activité de courtage en assurance</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Statut :</strong> Courtier en assurance</li>
            <li><strong>Immatriculation ORIAS :</strong> A compléter</li>
            <li>
              <strong>Autorité de contrôle :</strong> ACPR (Autorité de Contrôle Prudentiel et de Résolution),
              4 Place de Budapest, CS 92459, 75436 Paris Cedex 09
            </li>
            <li><strong>Assurance RC professionnelle :</strong> A compléter</li>
            <li><strong>Garantie financière :</strong> A compléter (si encaissement de fonds)</li>
            <li><strong>Liens capitalistiques avec des assureurs :</strong> A compléter (existence ou absence de liens)</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">4. Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu présent sur le site (textes, images, graphismes, logos, vidéos, etc.) est la propriété exclusive
            de Prévoyance Services, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation écrite
            est strictement interdite.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">5. Protection des données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification,
            de suppression et d’opposition sur vos données personnelles.
            Pour exercer vos droits, vous pouvez nous contacter à l’adresse suivante :
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Finalités des traitements :</strong> gestion des demandes de devis/contact, gestion des contrats, suivi client.</li>
            <li>
              <strong>Bases légales :</strong> exécution précontractuelle/contractuelle, obligations légales, consentement
              (prospection), intérêt légitime (sécurité et amélioration du service).
            </li>
            <li><strong>Durée de conservation :</strong> A compléter selon la politique interne et les obligations légales.</li>
            <li>
              <strong>Droit de réclamation :</strong> vous pouvez introduire une réclamation auprès de la CNIL
              (www.cnil.fr).
            </li>
            <li>
              <strong>Politique de confidentialité :</strong>{" "}
              <a href="/politique-confidentialite" className="text-teal-600 underline">
                consulter la politique de confidentialité complète
              </a>.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Email :</strong> dpo@prevoyanceservices.fr  
            <br />
            <strong>Adresse :</strong> Prévoyance Services – Délégué à la protection des données – 12 Rue du Général de Gaulle, 92230 Gennevilliers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">6. Transfert de données hors Union européenne</h2>
          <p>
            Certaines données peuvent être traitées en dehors de l’Union européenne par des prestataires techniques.
            Ces transferts sont encadrés par des garanties juridiques appropriées, incluant les clauses contractuelles types
            de la Commission européenne.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-3">7. Responsabilité</h2>
          <p>
            Prévoyance Services s’efforce d’assurer l’exactitude des informations diffusées sur ce site.  
            Toutefois, elle ne saurait être tenue responsable d’éventuelles erreurs, omissions ou indisponibilités du service.
          </p>
        </motion.div>
        </div>
      </section>
    </main>
  );
}
