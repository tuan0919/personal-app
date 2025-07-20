import { useState, useCallback } from "react";
import { Customer } from "@/api/types";

export interface UsePaymentStateReturn {
  state: {
    loading: boolean;
    customers: Customer[];
    selectedCustomers: Customer[];
  };
  actions: {
    setLoading: (loading: boolean) => void;
    setCustomers: (customers: Customer[]) => void;
    toggleSelectCustomer: (customer: Customer) => void;
    selectAllCustomers: () => void;
    clearSelectedCustomers: () => void;
  };
}

export function usePaymentState(): UsePaymentStateReturn {
  // Trạng thái loading
  const [loading, setLoading] = useState(true);

  // Dữ liệu khách hàng
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Khách hàng đã chọn
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  // Chọn/bỏ chọn khách hàng
  const toggleSelectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomers((prev) => {
      const isSelected = prev.some((c) => c.customerId === customer.customerId);

      if (isSelected) {
        return prev.filter((c) => c.customerId !== customer.customerId);
      } else {
        return [...prev, customer];
      }
    });
  }, []);

  // Chọn tất cả khách hàng
  const selectAllCustomers = useCallback(() => {
    if (selectedCustomers.length === customers.length) {
      // Nếu đã chọn tất cả, bỏ chọn tất cả
      setSelectedCustomers([]);
    } else {
      // Chọn tất cả
      setSelectedCustomers([...customers]);
    }
  }, [customers, selectedCustomers.length]);

  // Xóa tất cả lựa chọn
  const clearSelectedCustomers = useCallback(() => {
    setSelectedCustomers([]);
  }, []);

  return {
    state: {
      loading,
      customers,
      selectedCustomers,
    },
    actions: {
      setLoading,
      setCustomers,
      toggleSelectCustomer,
      selectAllCustomers,
      clearSelectedCustomers,
    },
  };
}
