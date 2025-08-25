import { useState, useEffect, useCallback } from "react";
import { Customer } from "@/types/api/admin/customer-management-page-types";
import { CustomerEditFormValues } from "@/types/api/admin/customer-edit-page-types";
import { CustomerService } from "@/api/admin";

interface CustomerEditState {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

export const useCustomerEdit = (customerId: number) => {
  const [state, setState] = useState<CustomerEditState>({
    customer: null,
    loading: true,
    error: null,
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
  });

  const fetchCustomer = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const customer = await CustomerService.getCustomerById(customerId);
      setState((prev) => ({
        ...prev,
        customer,
        loading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Không thể tải thông tin khách hàng.",
      }));
    }
  }, [customerId]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const handleUpdateCustomer = async (data: CustomerEditFormValues) => {
    try {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        submitError: null,
        submitSuccess: false,
      }));
      const success = await CustomerService.updateCustomer(customerId, data);

      if (success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          submitSuccess: true,
          customer: {
            ...prev.customer,
            ...data,
            customerId: customerId,
          } as Customer,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          submitError: "Không tìm thấy khách hàng để cập nhật.",
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: "Không thể cập nhật thông tin khách hàng.",
      }));
    }
  };

  const resetSubmitStatus = () => {
    setState((prev) => ({
      ...prev,
      submitError: null,
      submitSuccess: false,
    }));
  };

  return {
    state,
    actions: {
      refetch: fetchCustomer,
      updateCustomer: handleUpdateCustomer,
      resetSubmitStatus,
    },
  };
};
