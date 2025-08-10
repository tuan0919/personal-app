import { GetOrderPaymentButton } from "@/components/user/UserHome/GetOrderPaymentButton";
import { ActivityHistoryButton } from "@/components/user/UserHome/ActivityHistoryButton";
import { DeliveredCustomers } from "@/components/user/UserHome/DeliveredCustomers";
import { useUserState } from "@/hooks/useUserState";
import { FilterSheet } from "@/components/user/UserHome/FilterSheet";
import { motion } from "framer-motion";

export function View() {
  const { state, actions } = useUserState();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <GetOrderPaymentButton />
      <ActivityHistoryButton />
      <DeliveredCustomers
        onDeleteCustomer={actions.handleDeleteCustomer}
        onUpdateCustomer={actions.handleUpdateCustomer}
        delivered={state.deliveredCustomers}
        onFilterClick={() => actions.setFilterOpen(true)}
        selectedDate={state.selectedDate}
        onDateChange={actions.handleDateChange}
        loading={state.loading}
      />
      <FilterSheet
        open={state.filterOpen}
        onClose={() => actions.setFilterOpen(false)}
        onApply={actions.handleApplyFilter}
      />
    </motion.div>
  );
}
