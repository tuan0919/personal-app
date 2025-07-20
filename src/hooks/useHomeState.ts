import { useState, useEffect, useCallback } from "react";
import { CustomerService, Customer, FilterValues } from "@/api";
import { format } from "date-fns";

export interface UseHomeStateReturn {
  // Filter state
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  handleApplyFilter: (values: FilterValues) => void;

  // Date filter
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  handleDateChange: (date: Date) => void;

  // Customer data
  deliveredCustomers: Customer[];
  allCustomers: Customer[];
  loading: boolean;
  error: string | null;

  // Customer actions
  handleDeleteCustomer: (customerId: number) => Promise<void>;
  handleUpdateCustomer: (
    customerId: number,
    updates: Partial<Customer>
  ) => Promise<void>;

  // User type
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;

  // Data refresh
  refetchData: () => Promise<void>;
}

interface UseHomeStateProps {
  initialIsAdmin?: boolean;
}

export function useHomeState({
  initialIsAdmin = false,
}: UseHomeStateProps = {}): UseHomeStateReturn {
  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);

  // Date filter
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Customer data state
  const [deliveredCustomers, setDeliveredCustomers] = useState<Customer[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User type state
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  // Load data function
  const loadData = useCallback(
    async (date?: Date) => {
      try {
        setLoading(true);
        setError(null);

        const targetDate = date || selectedDate;
        const formattedDate = format(targetDate, "yyyy-MM-dd");

        const [delivered, all] = await Promise.all([
          CustomerService.getDeliveredCustomers(formattedDate),
          CustomerService.getAllCustomers(),
        ]);

        setDeliveredCustomers(delivered);
        setAllCustomers(all);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [selectedDate]
  );

  // Load initial data
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Date change handler
  const handleDateChange = useCallback(
    async (date: Date) => {
      setSelectedDate(date);
      await loadData(date);
    },
    [loadData]
  );

  // Refetch data function
  const refetchData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // Filter handler
  const handleApplyFilter = useCallback(
    async (values: FilterValues) => {
      try {
        setLoading(true);
        setError(null);

        const filtered = await CustomerService.getFilteredCustomers({
          ...values,
          date: format(selectedDate, "yyyy-MM-dd"),
        });
        setAllCustomers(filtered);

        // Also update delivered customers if they're affected by the filter
        const deliveredFiltered = filtered.filter((c) => c.delivered);
        setDeliveredCustomers(deliveredFiltered);

        console.log("Applied filters", values);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to apply filters"
        );
      } finally {
        setLoading(false);
      }
    },
    [selectedDate]
  );

  // Customer delete handler
  const handleDeleteCustomer = useCallback(async (customerId: number) => {
    try {
      await CustomerService.deleteCustomer(customerId);

      // Update local state
      setDeliveredCustomers((prev) =>
        prev.filter((c) => c.customerId !== customerId)
      );
      setAllCustomers((prev) =>
        prev.filter((c) => c.customerId !== customerId)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete customer"
      );
      throw err; // Re-throw so component can handle it
    }
  }, []);

  // Customer update handler
  const handleUpdateCustomer = useCallback(
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

        setDeliveredCustomers((prev) => updateCustomerInList(prev));
        setAllCustomers((prev) => updateCustomerInList(prev));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update customer"
        );
        throw err; // Re-throw so component can handle it
      }
    },
    []
  );

  return {
    // Filter state
    filterOpen,
    setFilterOpen,
    handleApplyFilter,

    // Date filter
    selectedDate,
    setSelectedDate,
    handleDateChange,

    // Customer data
    deliveredCustomers,
    allCustomers,
    loading,
    error,

    // Customer actions
    handleDeleteCustomer,
    handleUpdateCustomer,

    // User type
    isAdmin,
    setIsAdmin,

    // Data refresh
    refetchData,
  };
}
