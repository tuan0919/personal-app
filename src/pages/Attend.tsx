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
      className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-orange-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AttendNavbar />
      <CustomerForm />
      <DeliveredCustomers delivered={deliveredToday} />
      <div className="h-30" />
      <BottomNav />
    </motion.div>
  );
}
