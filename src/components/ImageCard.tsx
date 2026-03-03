import React from "react";
import { motion } from "framer-motion";
import type { ImageItem } from "../types";

interface ImageCardProps {
  item: ImageItem;
}

const cardVariants = {
  initial: {},
  hover: {},
};

const titleVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
};

const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  return (
    <motion.div
      className="relative flex-shrink-0 w-40 md:w-48 lg:w-56 h-60 rounded-lg overflow-hidden cursor-pointer group shadow-lg hover:shadow-glow-pink"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="object-cover w-full h-full pointer-events-none"
        loading="lazy"
      />

      {/* gradient overlay shows when parent is hovered */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent"
        variants={titleVariants}
        transition={{ duration: 0.3 }}
        style={{ opacity: 0 }}
      />

      {/* title appears at bottom on group hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm"
        variants={titleVariants}
        transition={{ duration: 0.3 }}
        style={{ opacity: 0 }}
      >
        {item.title}
      </motion.div>
    </motion.div>
  );
};

export default ImageCard;
