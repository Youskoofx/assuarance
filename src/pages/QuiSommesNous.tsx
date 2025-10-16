import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function QuiSommesNous() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Notre équipe à votre écoute"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-cyan-600/70" />
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Qui sommes-nous ?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl leading-relaxed"
          >
            Prévoyance Services, votre courtier d’assurances à <strong>Gennevilliers</strong>, dédié à votre tranquillité d’esprit.
          </motion.p>
        </div>
      </section>

      {/* Notre Identité */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Une expertise au service de votre sérénité
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              Depuis plus de 10 ans, <strong>Prévoyance Services</strong> accompagne particuliers et professionnels 
              dans le choix d’assurances claires, fiables et adaptées.  
              Notre priorité : vous garantir une protection sur mesure, sans jargon et avec un suivi humain.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Nous travaillons en toute indépendance avec les plus grands acteurs du marché afin de vous proposer 
              les meilleures garanties au juste prix. Chaque client bénéficie d’un accompagnement personnalisé, 
              du premier conseil jusqu’à la gestion de ses contrats.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Conseiller assurance"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-slate-900 mb-10"
          >
            Nos valeurs fondamentales
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Clarté", desc: "Des explications simples pour des décisions éclairées." },
              { title: "Proximité", desc: "Un interlocuteur unique, toujours à votre écoute." },
              { title: "Transparence", desc: "Aucune surprise, tout est clairement présenté." },
              { title: "Confiance", desc: "Des partenariats solides et durables avec nos clients." },
            ].map((valeur, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-teal-600 mb-3">{valeur.title}</h3>
                <p className="text-slate-600">{valeur.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres & Méthode */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Nos chiffres clés</h2>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-5xl font-bold text-teal-600">+2 000</p>
                <p className="text-slate-500">Clients accompagnés</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-teal-600">+20</p>
                <p className="text-slate-500">Partenaires assureurs</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-teal-600">10 ans</p>
                <p className="text-slate-500">d’expérience</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-teal-600">4,9/5</p>
                <p className="text-slate-500">Satisfaction client</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Notre méthode</h2>
            <ol className="space-y-6">
              {[
                { step: "Écoute", text: "Nous analysons votre situation et vos besoins réels." },
                { step: "Analyse", text: "Nous comparons les meilleures offres du marché." },
                { step: "Choix", text: "Nous vous guidons vers la solution la plus adaptée." },
                { step: "Accompagnement", text: "Nous restons à vos côtés tout au long de votre contrat." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.step}</h4>
                    <p className="text-slate-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 py-16 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Prêt à être accompagné par nos conseillers ?
        </motion.h2>
        <Link
          to="/devis"
          className="inline-block bg-white text-teal-600 font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:scale-105 transition-all"
        >
          Demander un devis gratuit
        </Link>
      </section>
    </main>
  );
}