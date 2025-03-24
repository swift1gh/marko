import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <HeroBackground />
      <div className="relative h-full flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8">
            <HeroContent />
            <HeroButtons />
          </motion.div>
        </div>
      </div>
      <div className="absolute left-0 right-0 h-32 bg-gradient-to-t from-primary-900 to-transparent" />
    </section>
  );
};

export default HeroSection;
