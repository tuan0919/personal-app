// Attend.tsx
import BottomNav from "@/components/BottomNav";
import AttendNavbar from "@/components/Attend/AttendNavbar";
import { motion } from "framer-motion";
import { CustomerForm } from "@/components/Attend/CustomerForm";
import { DeliveredCustomers } from "@/components/Attend/DeliveredCustomers";
import { allCustomers } from "@/static/mockCustomers";

export function Attend() {
  const deliveredToday = allCustomers.filter((c) => c.delivered);

  return (
    <motion.div
      className="min-h-screen bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AttendNavbar />
      <CustomerForm />
      <DeliveredCustomers delivered={deliveredToday} />
      <div className="h-20" />
      <BottomNav />
    </motion.div>
  );
}
