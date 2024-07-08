import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/utils/cn";

export const AnimatedGradientText = ({ children, className }: { children: ReactNode, className: string }) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <motion.span
      className={cn(
        "inline-block text-transparent bg-clip-text",
        "bg-[linear-gradient(to_right,#00ccb1,#7b61ff,#ffc414,#1ca0fb)]",
        className
      )}
      style={{
        backgroundSize: "400% 400%",
      }}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {children}
    </motion.span>
  );
};

export default AnimatedGradientText;
