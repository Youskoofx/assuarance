import { motion } from 'framer-motion';

const partners = [
  { name: 'Malakoff Humanis', logo: '/logos/malakoff.png' },
  { name: 'Allianz', logo: '/logos/allianz.png' },
  { name: 'April', logo: '/logos/april.png' },
  { name: 'Aesio Mutuelle', logo: '/logos/aesio.png' },
  { name: 'Alptis', logo: '/logos/alptis.png' },
  { name: 'SwissLife', logo: '/logos/swisslife.png' },
  { name: 'Zephir', logo: '/logos/zephir.png' },
  { name: 'Solly Azar', logo: '/logos/sollyazar.png' },
  { name: 'Netvox', logo: '/logos/netvox.png' },
  { name: 'Néoliane', logo: '/logos/neoliane.png' },
  { name: 'Maxance', logo: '/logos/maxance.png' },
];

export default function PartnerCarousel() {
  return (
    <section className="py-24 bg-transparent backdrop-blur-0 overflow-hidden">
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
          <p className="text-gray-600 text-xl">Votre garantie de qualité</p>
        </motion.div>

        {/* Infinite Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-16"
              animate={{ x: [0, -1800] }}
              transition={{
                x: { duration: 40, repeat: Infinity, ease: 'linear' },
              }}
              style={{ width: 'max-content' }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    rotateX: 8,
                    rotateY: -8,
                    rotateZ: 0,
                    transition: { duration: 0.4, ease: 'easeOut' },
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    title={partner.name}
                    className="h-14 w-auto object-contain drop-shadow-lg transition-all duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}