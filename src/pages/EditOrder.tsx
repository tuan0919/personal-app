// Attend.tsx
import { EditOrderNavBar } from "@/components/EditOrder/EditOrderNavBar";
import { motion } from "framer-motion";
import { CustomerForm } from "@/components/shared/CustomerForm";
import { useLocation } from "react-router-dom";

export function EditOrder() {
  const location = useLocation();
  const customer = location.state;
  console.log("customer ", customer);
  return (
    <motion.div
      className="min-h-screen bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <EditOrderNavBar />
      <CustomerForm customer={customer} />
      <div className="h-20" />
    </motion.div>
  );
}
