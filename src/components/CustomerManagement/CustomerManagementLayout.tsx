import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CustomerManagementNavbar } from "./CustomerManagementNavbar";

interface CustomerManagementLayoutProps {
  children: ReactNode;
}

export const CustomerManagementLayout = ({
  children,
}: CustomerManagementLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <CustomerManagementNavbar />
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
