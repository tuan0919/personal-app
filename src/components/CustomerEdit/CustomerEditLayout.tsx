import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CustomerEditNavbar } from "./CustomerEditNavbar";

interface CustomerEditLayoutProps {
  children: ReactNode;
}

export const CustomerEditLayout = ({ children }: CustomerEditLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <CustomerEditNavbar />
      <motion.main
        className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
};
