import { Customer } from '@/api';
import { GetOrderPaymentButton } from "@/components/Home/user/GetOrderPaymentButton";
import { ActivityHistoryButton } from "@/components/Home/user/ActivityHistoryButton";
import { AddOrderButton } from "@/components/Home/user/AddOrderButton";
import { DeliveredCustomers } from "@/components/Home/user/DeliveredCustomers";

interface UserViewProps {
  deliveredCustomers: Customer[];
  loading: boolean;
  error: string | null;
  onDeleteCustomer: (customerId: number) => Promise<void>;
  onUpdateCustomer: (customerId: number, updates: Partial<Customer>) => Promise<void>;
}

export function UserView({ 
  deliveredCustomers, 
  loading, 
  error, 
  onDeleteCustomer, 
  onUpdateCustomer 
}: UserViewProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-600">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-600">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <>
      <GetOrderPaymentButton />
      <ActivityHistoryButton />
      <AddOrderButton />
      <DeliveredCustomers
        onDeleteCustomer={onDeleteCustomer}
        onUpdateCustomer={onUpdateCustomer}
        delivered={deliveredCustomers}
      />
    </>
  );
}
