import { GetOrderPaymentButton } from "@/components/Home/user/GetOrderPaymentButton";
import { ActivityHistoryButton } from "@/components/Home/user/ActivityHistoryButton";
import { DeliveredCustomers } from "@/components/Home/user/DeliveredCustomers";
import { useViewLoadingState } from "@/hooks/useViewLoadingState";
import { ViewStateWrapper } from "./ViewStateWrapper";
import { useUserState } from "@/hooks/useUserState";
import { FilterSheet } from "@/components/Home/user/FilterSheet";

export function UserView() {
  const { state, actions } = useUserState();

  const { showLoading, handleLoadingComplete } = useViewLoadingState(state.loading);

  return (
    <ViewStateWrapper
      showLoading={showLoading}
      loading={state.loading}
      error={state.error}
      onLoadingComplete={handleLoadingComplete}
      onRetry={actions.refetchData}
      pageName="Trang chủ"
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
    </ViewStateWrapper>
  );
}
