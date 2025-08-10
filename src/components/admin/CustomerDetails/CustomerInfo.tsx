import { useRef } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/shared/animations";
import { useCustomerDetailsAnimation } from "@/animations/useCustomerDetailsAnimation";

interface Customer {
  name: string;
  username: string;
  phone: string;
  address: string;
  avatar: string;
}

interface CustomerInfoProps {
  customer: Customer;
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  const ref = useRef(null);
  const controls = useCustomerDetailsAnimation(ref);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      className="space-y-4 rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
    >
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-1">
          <div className="bg-white rounded-full p-2 overflow-hidden">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
          <p className="text-pink-500 font-medium">@{customer.username}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
        <div className="bg-green-100 rounded-full p-2">
          <FaPhoneAlt className="h-4 w-4 text-green-600" />
        </div>
        <span className="text-gray-700 font-medium">{customer.phone}</span>
      </div>

      <div className="flex items-start gap-3 bg-pink-50 rounded-xl p-3">
        <div className="bg-pink-100 rounded-full p-2 mt-1">
          <FaMapMarkerAlt className="h-4 w-4 text-pink-600" />
        </div>
        <span className="text-gray-700">{customer.address}</span>
      </div>
    </motion.div>
  );
}
