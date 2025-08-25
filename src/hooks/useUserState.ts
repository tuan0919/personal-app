import { useState, useEffect, useCallback } from "react";
import { CustomerService } from "@/api/user";
import { format } from "date-fns";

interface UserState {
  deliveredCustomers: Customer[];
  allCustomers: Customer[];
  loading: boolean;
  error: string | null;
  filterOpen: boolean;
  selectedDate: Date;
}

interface UseUserStateReturn {
  state: UserState;
  actions: {
    setFilterOpen: (open: boolean) => void;
    handleApplyFilter: (values: FilterValues) => void;
    setSelectedDate: (date: Date) => void;
    handleDateChange: (date: Date) => void;
    handleDeleteCustomer: (customerId: number) => Promise<void>;
    handleUpdateCustomer: (
      customerId: number,
      updates: Partial<Customer>
    ) => Promise<void>;
    refetchData: () => Promise<void>;
  };
}

interface UseUserStateProps {
  initialFilterOpen?: boolean;
}

export function useUserState({
  initialFilterOpen = false,
}: UseUserStateProps = {}): UseUserStateReturn {
  const [state, setState] = useState<UserState>({
    deliveredCustomers: [],
    allCustomers: [],
    loading: true,
    error: null,
    filterOpen: initialFilterOpen,
    selectedDate: new Date(),
  });

  // Load data function
  const loadData = useCallback(
    async (date?: Date) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const targetDate = date || state.selectedDate;
        const formattedDate = format(targetDate, "yyyy-MM-dd");

        const [delivered, all] = await Promise.all([
          CustomerService.getDeliveredCustomers(formattedDate),
          CustomerService.getAllCustomers(),
        ]);

        setState((prev) => ({
          ...prev,
          deliveredCustomers: delivered,
          allCustomers: all,
          loading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to load data",
          loading: false,
        }));
      }
    },
    [state.selectedDate]
  );

  // Load initial data
  useEffect(() => {
    loadData();
  }, [loadData]);

  const actions = {
    setFilterOpen: useCallback((open: boolean) => {
      setState((prev) => ({ ...prev, filterOpen: open }));
    }, []),

    handleApplyFilter: useCallback(
      async (values: FilterValues) => {
        try {
          setState((prev) => ({ ...prev, loading: true, error: null }));

          const filtered = await CustomerService.getFilteredCustomers({
            ...values,
            date: format(state.selectedDate, "yyyy-MM-dd"),
          });
          setState((prev) => ({
            ...prev,
            allCustomers: filtered,
            // Also update delivered customers if they're affected by the filter
            deliveredCustomers: filtered.filter((c) => c.delivered),
            loading: false,
          }));

          console.log("Applied filters", values);
        } catch (err) {
          setState((prev) => ({
            ...prev,
            error:
              err instanceof Error ? err.message : "Failed to apply filters",
            loading: false,
          }));
        }
      },
      [state.selectedDate]
    ),

    setSelectedDate: useCallback((date: Date) => {
      setState((prev) => ({ ...prev, selectedDate: date }));
    }, []),

    handleDateChange: useCallback(
      async (date: Date) => {
        setState((prev) => ({ ...prev, selectedDate: date }));
        await loadData(date);
      },
      [loadData]
    ),

    handleDeleteCustomer: useCallback(async (customerId: number) => {
      try {
        await CustomerService.deleteCustomer(customerId);

        // Update local state
        setState((prev) => ({
          ...prev,
          deliveredCustomers: prev.deliveredCustomers.filter(
            (c) => c.customerId !== customerId
          ),
          allCustomers: prev.allCustomers.filter(
            (c) => c.customerId !== customerId
          ),
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error:
            err instanceof Error ? err.message : "Failed to delete customer",
        }));
        throw err; // Re-throw so component can handle it
      }
    }, []),

    handleUpdateCustomer: useCallback(
      async (customerId: number, updates: Partial<Customer>) => {
        try {
          const updatedCustomer = await CustomerService.updateCustomer(
            customerId,
            updates
          );

          // Update local state
          const updateCustomerInList = (customers: Customer[]) =>
            customers.map((c) =>
              c.customerId === customerId ? updatedCustomer : c
            );

          setState((prev) => ({
            ...prev,
            deliveredCustomers: updateCustomerInList(prev.deliveredCustomers),
            allCustomers: updateCustomerInList(prev.allCustomers),
          }));
        } catch (err) {
          setState((prev) => ({
            ...prev,
            error:
              err instanceof Error ? err.message : "Failed to update customer",
          }));
          throw err; // Re-throw so component can handle it
        }
      },
      []
    ),

    refetchData: useCallback(async () => {
      await loadData();
    }, [loadData]),
  };

  return { state, actions };
}
