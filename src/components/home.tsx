import { motion } from 'framer-motion';
import Header from './Header';
import HeroSection from './HeroSection';
import ValueProposition from './ValueProposition';
import ProductOfferings from './ProductOfferings';
import Statistics from './Statistics';
import PartnerCarousel from './PartnerCarousel';
import FAQTestimonials from './FAQTestimonials';
import NewsSection from './NewsSection';


function Home() {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <ProductOfferings />
        <Statistics />
        <PartnerCarousel />
        <FAQTestimonials />
        <NewsSection />
      </main>
   
    </motion.div>
  );
}

export default Home;