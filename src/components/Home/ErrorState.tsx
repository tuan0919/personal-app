import { motion } from "framer-motion";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const errorVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

const iconVariants = {
  initial: { rotate: -180, scale: 0 },
  animate: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      delay: 0.2,
    },
  },
};

const buttonVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      delay: 0.4,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeInOut" as const,
    },
  },
};

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4"
      variants={errorVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6"
        variants={iconVariants}
      >
        <FaExclamationTriangle className="text-red-500 text-3xl" />
      </motion.div>

      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Đã xảy ra lỗi
      </motion.h3>

      <motion.p
        className="text-gray-600 text-center mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {error}
      </motion.p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaRedo className="text-sm" />
          Thử lại
        </motion.button>
      )}
    </motion.div>
  );
}
