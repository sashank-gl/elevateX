import { motion } from "framer-motion";
import React from "react";
const Loader = () => {
  return (
    <motion.div
      animate={{
        rotate: [0, 90, 180, 90, 0],
        scale: [1, 1.5, 2, 1.5, 1],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        backgroundColor: ["#f582ae", "#001858", "#8bd3dd"],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatDelay: 0.75,
      }}
      className="h-10 w-10"
    />
  );
};

export default Loader;
