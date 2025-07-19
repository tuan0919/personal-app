import { motion } from "framer-motion";
import { ReactNode, Children } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {Children.map(children, (child: ReactNode, index: number) => (
        <motion.div key={index} variants={itemVariants} custom={index}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
