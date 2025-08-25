import { useState } from "react";
import { CustomerService } from "@/api/admin";
import type { Customer } from "@/types/api/admin/customer-management-page-types";
import type { CustomerNewFormValues } from "@/types/api/admin/customer-new-page-types";

interface CustomerNewState {
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  createdCustomer: Customer | null;
}

export const useCustomerNew = () => {
  const [state, setState] = useState<CustomerNewState>({
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    createdCustomer: null,
  });

  const createCustomer = async (data: CustomerNewFormValues) => {
    try {
      setState((prev) => ({ ...prev, isSubmitting: true, submitError: null, submitSuccess: false }));
      const created = await CustomerService.createCustomer(data);
      setState({ isSubmitting: false, submitError: null, submitSuccess: true, createdCustomer: created });
    } catch {
      setState((prev) => ({ ...prev, isSubmitting: false, submitError: "Không thể tạo khách hàng.", submitSuccess: false }));
    }
  };

  const resetSubmitStatus = () => {
    setState((prev) => ({ ...prev, submitError: null, submitSuccess: false }));
  };

  return {
    state,
    actions: {
      createCustomer,
      resetSubmitStatus,
    },
  };
};
