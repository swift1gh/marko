import { motion } from "framer-motion";

const HeroContent = () => {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 font-display tracking-tight">
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-100">
          Marko
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-light max-w-3xl mx-auto">
        Your One-Stop Shop for Student Essentials
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg text-gray-200 max-w-2xl mx-auto">
        From textbooks to tech, find everything you need for success at
        Kwame Nkrumah University of Science and Technology
      </motion.p>
    </>
  );
};

export default HeroContent; 