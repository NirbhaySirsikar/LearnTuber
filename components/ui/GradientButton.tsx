
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/utils/cn";
import { Button } from './button';

export const GradientButton = ({ className, onClick }: { className: string, onClick: () => void }) => {
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
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Button className="bg-transparent text-primary-foreground px-6 py-2 rounded-[22px] hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => onClick()}
      >
        Generate
      </Button>
    </motion.span>
  );
};

export default GradientButton;
