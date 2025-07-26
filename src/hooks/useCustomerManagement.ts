import { useState, useEffect, useCallback } from "react";
import { CustomerService, Customer } from "@/api";

interface CustomerManagementState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export const useCustomerManagement = () => {
  const [state, setState] = useState<CustomerManagementState>({
    customers: [],
    loading: true,
    error: null,
    searchTerm: "",
  });

  const fetchCustomers = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const allCustomers = await CustomerService.getAllCustomers();
      setState((prev) => ({
        ...prev,
        customers: allCustomers,
        loading: false,
      }));
    } catch {
      // Error is handled by setting the error state, no need to use the error object
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Không thể tải danh sách khách hàng.",
      }));
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSearch = (term: string) => {
    setState((prev) => ({ ...prev, searchTerm: term }));
  };

  const filteredCustomers = state.customers.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return {
    state: {
      ...state,
      filteredCustomers,
    },
    actions: {
      handleSearch,
      refetch: fetchCustomers,
    },
  };
};
