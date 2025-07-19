import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 relative overflow-hidden">
      {/* Background Pattern - enhanced with more vibrant colors */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Light beam effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1 h-40 bg-white opacity-30 rotate-45 blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-60 bg-white opacity-20 -rotate-45 blur-sm"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-40 bg-white opacity-30 rotate-12 blur-sm"></div>
      </div>

      {/* Gradient Overlay - enhanced with more vibrant colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/30 via-purple-300/25 to-pink-400/30"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-30 scale-110"></div>
              <img
                src="/icon.png"
                alt="Logo"
                className="w-24 h-24 mx-auto mb-4 drop-shadow-xl relative z-10"
              />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-gray-900 drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-gray-700 mt-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            style={{
              boxShadow: "0 10px 30px -10px rgba(156, 39, 176, 0.3)",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
