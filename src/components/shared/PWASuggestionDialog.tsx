import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PWASuggestionDialogProps {
  open: boolean;
  onClose: () => void;
  onInstall?: () => void;
}

export const PWASuggestionDialog: React.FC<PWASuggestionDialogProps> = ({
  open,
  onClose,
  onInstall,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 mb-15 backdrop-blur-sm rounded-3xl p-8 max-w-xs w-full shadow-2xl border border-blue-100 text-center"
          >
            <motion.div
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <img
                src="/icon.png"
                alt="App icon"
                className="h-10 w-10 object-contain"
              />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Tải ứng dụng về thiết bị?
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Để có trải nghiệm tốt hơn, hãy cài đặt ứng dụng này lên thiết bị
              của bạn như một PWA (Progressive Web App).
            </p>
            <div className="flex space-x-3 mt-6">
              {onInstall && (
                <motion.button
                  onClick={onInstall}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cài đặt
                </motion.button>
              )}
              <motion.button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Để sau
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
