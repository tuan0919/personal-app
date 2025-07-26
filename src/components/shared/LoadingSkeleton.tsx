import { motion } from "framer-motion";
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
      duration: 1.2,
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
      duration: 2,
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
  loading?: boolean; // Pass loading state from parent
  pageName?: string; // Tên trang đang load
}

export function LoadingSkeleton({
  onComplete,
  loading = true,
  pageName = "Trang chủ",
}: LoadingSkeletonProps) {
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // If still loading, cycle through loading stages
      if (loading) {
        setLoadingStage((prevStage) => (prevStage + 1) % 4);
      } else {
        // Loading finished
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    }, 2000); // Change stage every 2 seconds

    return () => clearInterval(interval);
  }, [loading, onComplete]);

  // Get detailed loading text based on stage
  const getLoadingText = (stage: number) => {
    const stageTexts = [
      `Đang kết nối đến máy chủ...`,
      `Đang tải dữ liệu ${pageName}...`,
      `Đang xử lý dữ liệu...`,
      `Đang hoàn thiện thông tin...`,
    ];

    return stageTexts[stage] || "Đang xử lý...";
  };

  // Get subtitle based on stage
  const getSubtitle = (stage: number) => {
    const subtitles = [
      "Thiết lập kết nối an toàn",
      `Tải thông tin ${pageName}`,
      "Tính toán thống kê dữ liệu",
      "Kiểm tra và cập nhật dữ liệu",
    ];

    return subtitles[stage] || "Vui lòng chờ trong giây lát";
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
          className="relative mb-6"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto relative overflow-hidden border border-white/30"
            variants={pulseVariants}
            animate="animate"
          >
            {/* Website Icon */}
            <img
              src="/icon.png"
              alt="Loading"
              className="w-10 h-10 object-contain"
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>
        </motion.div>

        {/* Page Name */}
        <motion.div
          className="text-white/90 font-bold text-3xl mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {pageName}
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-lg font-medium mb-3 min-h-[2rem] flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {getLoadingText(loadingStage)}
        </motion.h2>

        <motion.p
          className="text-white/80 text-base mb-6 min-h-[1.5rem] flex items-center justify-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {getSubtitle(loadingStage)}
        </motion.p>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center items-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={dotsVariants}
              animate="animate"
              className="w-3 h-3 rounded-full bg-white/70 shadow-md shadow-white/10"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
