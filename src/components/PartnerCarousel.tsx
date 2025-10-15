import { motion } from 'framer-motion';

const partners = [
  'Malakoff Humanis',
  'Allianz',
  'April',
  'Aesio Mutuelle',
  'Alptis',
  'SwissLife',
  'Zephir',
  'Solly Azar',
  'Netvox',
  'Néoliane',
  'Maxance',
];

export default function PartnerCarousel() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-slate-900 text-5xl font-bold tracking-tight mb-4">
            Nos partenaires de confiance
          </h2>
          <p className="text-gray-600 text-xl">
            Votre garantie de qualité
          </p>
        </motion.div>

        {/* Infinite Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-16"
              animate={{
                x: [0, -1800],
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{ width: 'max-content' }}
            >
              {/* First set */}
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 h-16 w-32 bg-slate-200 rounded-lg flex items-center justify-center font-semibold text-slate-600 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                >
                  {partner}
                </div>
              ))}
              {/* Second set for seamless loop */}
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 h-16 w-32 bg-slate-200 rounded-lg flex items-center justify-center font-semibold text-slate-600 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                >
                  {partner}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}