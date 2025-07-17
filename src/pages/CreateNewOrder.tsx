// Attend.tsx
import BottomNav from "@/components/BottomNav";
import AttendNavbar from "@/components/CreateNewOrder/AttendNavbar";
import { motion } from "framer-motion";
import { CustomerForm } from "@/components/CreateNewOrder/CustomerForm";

export function CreateNewOrder() {
  return (
    <motion.div
      className="min-h-screen bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AttendNavbar />
      <CustomerForm />
      <div className="h-20" />
      <BottomNav />
    </motion.div>
  );
}
