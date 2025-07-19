import { motion } from "framer-motion";
import { FaIceCream } from "react-icons/fa6";
import { useState, useEffect } from "react";

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

const logoVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      delay: 0.2,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

const dotsVariants = {
  animate: (i: number) => ({
    scale: [1, 1.3, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: i * 0.2,
      ease: "easeInOut" as const,
    },
  }),
};

interface LoadingSkeletonProps {
  onComplete?: () => void;
  duration?: number; // Total duration in milliseconds
}

export function LoadingSkeleton({
  onComplete,
  duration = 2000,
}: LoadingSkeletonProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setIsComplete(true);
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 500); // Small delay before calling onComplete
      }
    }, 50); // Update every 50ms for smooth progress

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  // Simulate different loading stages
  const getLoadingText = (progress: number) => {
    if (progress < 20) return "Khởi tạo...";
    if (progress < 40) return "Đang tải dữ liệu...";
    if (progress < 60) return "Xử lý thông tin...";
    if (progress < 80) return "Hoàn thiện...";
    if (progress < 100) return "Sắp xong...";
    return "Hoàn thành!";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Gradient overlay with blur effect */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(236, 72, 153, 0.85) 0%, rgba(147, 51, 234, 0.85) 50%, rgba(37, 99, 235, 0.85) 100%),
            url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 text-center text-white pointer-events-auto">
        {/* Logo with Shimmer */}
        <motion.div
          className="relative mb-8"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto relative overflow-hidden border border-white/30"
            variants={pulseVariants}
            animate="animate"
          >
            <FaIceCream className="text-white text-4xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.h1
          className="text-3xl font-bold mb-4 min-h-[2.5rem] flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {getLoadingText(progress)}
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg mb-8 min-h-[1.5rem] flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {progress < 100 ? "Vui lòng chờ trong giây lát" : "Tải hoàn tất!"}
        </motion.p>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center items-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              custom={i}
              variants={dotsVariants}
              animate="animate"
            />
          ))}
        </motion.div>

        {/* Progress Bar with Percentage - Fixed Width */}
        <motion.div
          className="w-80 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {/* Progress Bar Container */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm mb-3">
            <motion.div
              className="h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.1,
                ease: "easeOut" as const,
              }}
            >
              {/* Shimmer effect on progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear" as const,
                }}
              />
            </motion.div>
          </div>

          {/* Percentage Text */}
          <motion.div
            className="text-white/90 font-semibold text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>

        {/* Completion Animation */}
        {isComplete && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
