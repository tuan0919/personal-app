import { Customer } from "@/api";
import { GetOrderPaymentButton } from "@/components/Home/user/GetOrderPaymentButton";
import { ActivityHistoryButton } from "@/components/Home/user/ActivityHistoryButton";
import { DeliveredCustomers } from "@/components/Home/user/DeliveredCustomers";
import { BaseViewProps } from "./types";
import { useViewLoadingState } from "@/hooks/useViewLoadingState";
import { ViewStateWrapper } from "./ViewStateWrapper";

interface UserViewProps extends BaseViewProps {
  deliveredCustomers: Customer[];
  loading: boolean;
  error: string | null;
  onDeleteCustomer: (customerId: number) => Promise<void>;
  onUpdateCustomer: (
    customerId: number,
    updates: Partial<Customer>
  ) => Promise<void>;
  onFilterClick?: () => void;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function UserView({
  deliveredCustomers,
  loading,
  error,
  onDeleteCustomer,
  onUpdateCustomer,
  onRetry,
  onFilterClick,
  selectedDate,
  onDateChange,
}: UserViewProps) {
  const { showLoading, handleLoadingComplete } = useViewLoadingState(loading);

  return (
    <ViewStateWrapper
      showLoading={showLoading}
      loading={loading}
      error={error}
      onLoadingComplete={handleLoadingComplete}
      onRetry={onRetry}
      pageName="Trang chủ"
    >
      <GetOrderPaymentButton />
      <ActivityHistoryButton />
      <DeliveredCustomers
        onDeleteCustomer={onDeleteCustomer}
        onUpdateCustomer={onUpdateCustomer}
        delivered={deliveredCustomers}
        onFilterClick={onFilterClick}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        loading={loading}
      />
    </ViewStateWrapper>
  );
}
