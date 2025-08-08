import { useCallback, useEffect, useState } from "react";
import { CustomerService } from "@/api/admin";
import type { Customer as AdminCustomer } from "@/types/admin/customer-management-page-types";

interface CustomerDetailsState {
  loading: boolean;
  error: string | null;
  customer: AdminCustomer | null;
}

export const useCustomerDetails = (customerId?: number) => {
  const [state, setState] = useState<CustomerDetailsState>({
    loading: true,
    error: null,
    customer: null,
  });

  const fetchCustomer = useCallback(async () => {
    if (!Number.isFinite(customerId as number)) {
      setState({ loading: false, error: null, customer: null });
      return;
    }
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await CustomerService.getCustomerById(customerId as number);
      setState({ loading: false, error: null, customer: data });
    } catch {
      setState({ loading: false, error: "Không thể tải thông tin khách hàng.", customer: null });
    }
  }, [customerId]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  return {
    state,
    actions: {
      refetch: fetchCustomer,
    },
  } as const;
};
