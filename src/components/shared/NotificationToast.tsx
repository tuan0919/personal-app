import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
  FiX,
} from "react-icons/fi";
import { useApp } from "@/context/AppContext";

interface NotificationIconProps {
  type: "success" | "error" | "warning" | "info";
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  switch (type) {
    case "success":
      return <FiCheckCircle className="w-5 h-5 text-green-500" />;
    case "error":
      return <FiXCircle className="w-5 h-5 text-red-500" />;
    case "warning":
      return <FiAlertCircle className="w-5 h-5 text-yellow-500" />;
    case "info":
      return <FiInfo className="w-5 h-5 text-blue-500" />;
  }
};

const toastVariants = {
  initial: { opacity: 0, y: -20, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.9 },
};

const toastTypeClasses = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

export function NotificationToast() {
  const { state, removeNotification } = useApp();
  const { notifications } = state;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-xs w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`rounded-lg border shadow-lg p-4 flex items-start gap-3 ${
              toastTypeClasses[notification.type]
            }`}
          >
            <NotificationIcon type={notification.type} />
            <div className="flex-1 pr-5">{notification.message}</div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
