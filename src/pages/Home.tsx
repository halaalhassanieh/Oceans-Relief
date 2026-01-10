
import { motion } from 'framer-motion';
import {  PAGE_TRANSITIONS } from "../Configuration";
import Features from '../components/Features';
import HomeHero from '../components/HomeHero';

const Home = () => {
  return (
    <motion.div
      key="home"
      initial={PAGE_TRANSITIONS.initial}
      animate={PAGE_TRANSITIONS.animate}
      exit={PAGE_TRANSITIONS.exit}
      transition={PAGE_TRANSITIONS.transition}
    >
   
     {/* Hero  */}

     <HomeHero/>
     
     {/* Features */}
      
      <Features/>

    </motion.div>
  );
};

export default Home;
