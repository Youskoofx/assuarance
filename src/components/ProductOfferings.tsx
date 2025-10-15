import { motion } from 'framer-motion';
import { BarChart3, ClipboardCheck, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: BarChart3,
    title: 'Analyse précise de vos besoins',
    description: 'Nous étudions votre situation pour identifier vos besoins réels et vous proposer les meilleures solutions',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Conseils stratégiques',
    description: 'Des recommandations personnalisées basées sur votre profil et vos objectifs de protection',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Solutions personnalisées et optimisées',
    description: 'Des offres sur-mesure adaptées à votre budget avec le meilleur rapport qualité-prix',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    number: '04',
    icon: RefreshCw,
    title: 'Suivi proactif et ajustements continus',
    description: 'Un accompagnement permanent pour faire évoluer vos garanties selon vos besoins',
    gradient: 'from-purple-500 to-pink-500'
  }
];

export default function ProductOfferings() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            L'excellence à chaque étape
          </span>
          <h2 className="text-slate-900 text-5xl font-bold tracking-tight mb-4">
            Votre tranquillité d'esprit, notre engagement
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Un processus éprouvé pour vous garantir la meilleure protection
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-slate-50 border-2 border-teal-100 rounded-2xl p-8 hover:border-teal-500 hover:shadow-md transition-all duration-300 h-[380px] flex flex-col relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Watermark Number */}
              <div className="absolute top-4 right-4 text-9xl font-bold text-teal-600/5 leading-none">
                {step.number}
              </div>

              {/* Icon Circle */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">
                {step.title}
              </h3>
              
              <p className="text-slate-700 leading-relaxed flex-1 relative z-10">
                {step.description}
              </p>

              {/* Arrow (visible on hover) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                  <ArrowRight className="w-6 h-6 text-teal-600" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Connection Line (Desktop) */}
        <svg className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ height: '2px', width: '100%' }}>
          <motion.line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#99f6e4"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}