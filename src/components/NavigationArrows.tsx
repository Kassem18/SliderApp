import React from "react";
import { motion } from "framer-motion";

interface NavigationArrowsProps {
  onLeft: () => void;
  onRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  onLeft,
  onRight,
  canScrollLeft,
  canScrollRight,
}) => (
  <>
    <motion.button
      aria-label="scroll-left"
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-br from-pink-500 to-pink-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300 shadow-glow-pink disabled:opacity-20 disabled:cursor-not-allowed"
      whileHover={canScrollLeft ? { scale: 1.2 } : {}}
      onClick={onLeft}
      disabled={!canScrollLeft}
    >
      &#9664;
    </motion.button>
    <motion.button
      aria-label="scroll-right"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-br from-pink-500 to-pink-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300 shadow-glow-pink disabled:opacity-20 disabled:cursor-not-allowed"
      whileHover={canScrollRight ? { scale: 1.2 } : {}}
      onClick={onRight}
      disabled={!canScrollRight}
    >
      &#9654;
    </motion.button>
  </>
);

export default NavigationArrows;
