import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className, onClick, hoverable = true }) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;