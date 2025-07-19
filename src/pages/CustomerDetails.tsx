import { useState } from "react";
import { motion } from "framer-motion";
import { CustomerInfo } from "@/components/CustomerDetails/CustomerInfo";
import { CustomerMap } from "@/components/CustomerDetails/CustomerMap";
import { PriceSection } from "@/components/CustomerDetails/PriceSection";
import { CustomCalendar } from "@/components/CustomerDetails/CustomCalendar";
import { WeeklyRevenueChart } from "@/components/CustomerDetails/WeeklyRevenueChart";
import { DeliveryHistory } from "@/components/CustomerDetails/DeliveryHistory";

// Import mock data
import {
  customer,
  deliveryHistory,
  weeklyRevenueData,
  deliveredDates,
} from "@/static/mockCustomerDetails";

export function CustomerDetails() {
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 3;

  const totalHistoryPages = Math.ceil(deliveryHistory.length / historyPerPage);
  const pagedHistory = deliveryHistory.slice(
    (historyPage - 1) * historyPerPage,
    historyPage * historyPerPage
  );

  return (
    <div className="min-h-screen bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <motion.main
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 lg:grid-cols-2">
          <CustomerInfo customer={customer} />
          <CustomerMap
            location={customer.location}
            name={customer.name}
            address={customer.address}
          />
        </div>
        <div className="mx-auto max-w-7xl space-y-6 p-4 pb-24">
          <CustomCalendar deliveredDates={deliveredDates} />
          <PriceSection price={customer.price} />
          <WeeklyRevenueChart data={weeklyRevenueData} />
          <DeliveryHistory
            data={pagedHistory}
            currentPage={historyPage}
            onPageChange={setHistoryPage}
            totalPages={totalHistoryPages}
          />
        </div>
      </motion.main>
    </div>
  );
}
