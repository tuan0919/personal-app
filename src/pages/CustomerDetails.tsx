import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CustomerInfo } from "@/components/CustomerDetails/CustomerInfo";
import { PriceSection } from "@/components/CustomerDetails/PriceSection";
import { CustomCalendar } from "@/components/CustomerDetails/CustomCalendar";
import { WeeklyRevenueChart } from "@/components/CustomerDetails/WeeklyRevenueChart";
import { DeliveryHistory } from "@/components/CustomerDetails/DeliveryHistory";
import { useParams } from "react-router-dom";
import { CustomerDetailsLayout } from "@/components/CustomerDetails/CustomerDetailsLayout";
import { useCustomerDetails } from "@/hooks/useCustomerDetails";

// Import mock data
import {
  customer,
  deliveryHistory,
  weeklyRevenueData,
  deliveredDates,
} from "@/static/mockCustomerDetails";

const CustomerDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 3;
  const cid = Number(id);
  const { state, actions } = useCustomerDetails(
    Number.isFinite(cid) ? cid : undefined
  );

  // Helper: build placeholder avatar if missing
  const buildAvatar = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF69B4&color=fff&size=96`;

  // Map Admin customer -> UI props for CustomerInfo
  const uiCustomer = useMemo(() => {
    if (state.customer) {
      const uname = state.customer.customerName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
      return {
        name: state.customer.customerName,
        username: uname,
        phone: state.customer.phoneNumber,
        address: state.customer.address,
        avatar:
          state.customer.avatar || buildAvatar(state.customer.customerName),
      };
    }
    // Fallback to mock
    return {
      ...customer,
      avatar: customer.avatar || buildAvatar(customer.name),
    };
  }, [state.customer]);

  // Map Admin customer price -> thousands for PriceSection
  const uiPrice = useMemo(() => {
    if (state.customer) {
      return {
        // In admin type: price2 = Đá Cây, price1 = Đá Bi
        daCay: Math.round(state.customer.price2 / 1000),
        daBi: Math.round(state.customer.price1 / 1000),
      };
    }
    return customer.price;
  }, [state.customer]);

  const totalHistoryPages = Math.ceil(deliveryHistory.length / historyPerPage);
  const pagedHistory = deliveryHistory.slice(
    (historyPage - 1) * historyPerPage,
    historyPage * historyPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
        {state.loading ? (
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-pink-100 text-center text-gray-600">
            Đang tải thông tin khách hàng...
          </div>
        ) : state.error ? (
          <div className="rounded-2xl bg-red-50 p-6 border border-red-200 text-center text-red-600">
            {state.error}
            <button onClick={actions.refetch} className="ml-4 px-4 py-1 bg-red-500 text-white rounded-md">
              Thử lại
            </button>
          </div>
        ) : (
          <CustomerInfo customer={uiCustomer} />
        )}
      </div>
      <div className="space-y-6 p-4">
        <CustomCalendar deliveredDates={deliveredDates} />
        <PriceSection price={uiPrice} />
        <WeeklyRevenueChart data={weeklyRevenueData} />
        <DeliveryHistory
          data={pagedHistory}
          currentPage={historyPage}
          onPageChange={setHistoryPage}
          totalPages={totalHistoryPages}
        />
      </div>
    </motion.div>
  );
};

export const CustomerDetails = () => {
  return (
    <CustomerDetailsLayout>
      <CustomerDetailsView />
    </CustomerDetailsLayout>
  );
};
