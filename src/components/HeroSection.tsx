// src/components/HeroSection.tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-none">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/4262010/pexels-photo-4262010.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
        <motion.h1
          className="text-white text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Votre courtier d'assurances à{' '}
          <span className="text-teal-400">Gennevilliers</span>
        </motion.h1>

        {/* ⛔️ Separator supprimé (c’était la ligne) */}
        {/* <motion.div className="w-32 h-1 bg-white mx-auto mb-6" ... /> */}

        <motion.p
          className="text-gray-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Des solutions d'assurance personnalisées pour votre santé, votre famille et vos biens
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-teal-500/50 hover:scale-105 transition-all"
            asChild
          >
            <Link to="/devis" className="flex items-center gap-2">
              Demander un devis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white/50 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all"
            asChild
          >
            <Link to="#services">Découvrir nos services</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-10 h-10 text-white/70" />
      </motion.div>
    </section>
  );
}