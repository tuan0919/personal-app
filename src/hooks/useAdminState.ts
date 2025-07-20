import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { allCustomers, Customer } from "@/static/admin/mockCustomers";

interface AdminFilterValues {
  minPrice: number;
  maxPrice: number;
  iceCube: boolean;
  iceBlock: boolean;
  paymentStatus: "all" | "paid" | "unpaid";
  deliveryStatus: "all" | "delivered" | "pending";
  shipperFilter: string;
  customerFilter: string;
}

interface AdminState {
  isLoading: boolean;
  orders: Customer[];
  filteredOrders: Customer[];
  selectedDate: Date;
  currentPage: number;
  selectedRecord: number | null;
  showActionPopup: boolean;
  showDeleteConfirm: boolean;
  showFilterSheet: boolean;
  filters: AdminFilterValues;
  error: string | null;
}

interface UseAdminStateReturn {
  state: AdminState;
  actions: {
    setLoading: (loading: boolean) => void;
    setSelectedDate: (date: Date) => void;
    setCurrentPage: (page: number) => void;
    setSelectedRecord: (record: number | null) => void;
    setShowActionPopup: (show: boolean) => void;
    setShowDeleteConfirm: (show: boolean) => void;
    setShowFilterSheet: (show: boolean) => void;
    updateFilters: (filters: Partial<AdminFilterValues>) => void;
    setError: (error: string | null) => void;
    resetState: () => void;
    handleOrderSelect: (orderId: number) => void;
    handleClosePopup: () => void;
    handleDeleteClick: (id: number) => void;
    confirmDelete: () => Promise<void>;
    handleDateChange: (date: Date) => void;
    handleApplyFilter: (values: AdminFilterValues) => void;
  };
  computed: {
    totalPages: number;
    paged: Customer[];
    selectedOrder: Customer | undefined;
  };
}

export const useAdminState = (): UseAdminStateReturn => {
  const [state, setState] = useState<AdminState>({
    isLoading: true, // Only one loading state, start with true
    orders: [],
    filteredOrders: [],
    selectedDate: new Date(),
    currentPage: 1,
    selectedRecord: null,
    showActionPopup: false,
    showDeleteConfirm: false,
    showFilterSheet: false,
    filters: {
      minPrice: 0,
      maxPrice: 1000000,
      iceCube: true,
      iceBlock: true,
      paymentStatus: "all",
      deliveryStatus: "all",
      shipperFilter: "",
      customerFilter: "",
    },
    error: null,
  });

  const ordersPerPage = 5; // Giảm số lượng đơn hàng mỗi trang để dễ dàng kiểm tra phân trang

  // Effect to load and filter data
  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const timer = setTimeout(() => {
      try {
        const dateStr = format(state.selectedDate, "yyyy-MM-dd");
        const ordersToday = allCustomers.filter((o) => o.date === dateStr);

        const filtered = ordersToday.filter((order) => {
          if (
            state.filters.customerFilter &&
            !order.customerName
              .toLowerCase()
              .includes(state.filters.customerFilter.toLowerCase())
          )
            return false;
          if (
            state.filters.shipperFilter &&
            !order.shipper.name
              .toLowerCase()
              .includes(state.filters.shipperFilter.toLowerCase())
          )
            return false;
          if (
            state.filters.deliveryStatus !== "all" &&
            (state.filters.deliveryStatus === "delivered") !== order.delivered
          )
            return false;
          if (
            state.filters.paymentStatus !== "all" &&
            order.paymentStatus !== state.filters.paymentStatus
          )
            return false;
          return true;
        });

        setState((prev) => ({
          ...prev,
          orders: ordersToday,
          filteredOrders: filtered,
          isLoading: false, // Simply turn off loading when done
          currentPage: 1,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          error: "Failed to load data",
          isLoading: false,
        }));
      }
    }, 1200); // Increased delay slightly to better see the effect

    return () => clearTimeout(timer);
  }, [state.selectedDate, state.filters]);

  const actions = {
    setLoading: useCallback((loading: boolean) => {
      setState((prev) => ({ ...prev, isLoading: loading }));
    }, []),

    setSelectedDate: useCallback((date: Date) => {
      setState((prev) => ({ ...prev, selectedDate: date, currentPage: 1 }));
      // Refetch or filter data based on new date if needed
    }, []),

    setCurrentPage: useCallback((page: number) => {
      setState((prev) => ({ ...prev, currentPage: page }));
    }, []),

    setSelectedRecord: useCallback((record: number | null) => {
      setState((prev) => ({ ...prev, selectedRecord: record }));
    }, []),

    setShowActionPopup: useCallback((show: boolean) => {
      setState((prev) => ({ ...prev, showActionPopup: show }));
    }, []),

    setShowDeleteConfirm: useCallback((show: boolean) => {
      setState((prev) => ({ ...prev, showDeleteConfirm: show }));
    }, []),

    setShowFilterSheet: useCallback((show: boolean) => {
      setState((prev) => ({ ...prev, showFilterSheet: show }));
    }, []),

    updateFilters: useCallback((filters: Partial<AdminFilterValues>) => {
      setState((prev) => ({
        ...prev,
        filters: { ...prev.filters, ...filters },
      }));
    }, []),

    setError: useCallback((error: string | null) => {
      setState((prev) => ({ ...prev, error, isLoading: false }));
    }, []),

    resetState: useCallback(() => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true, // Just trigger loading on reset
        selectedDate: new Date(),
        filters: {
          minPrice: 0,
          maxPrice: 1000000,
          iceCube: true,
          iceBlock: true,
          paymentStatus: "all",
          deliveryStatus: "all",
          shipperFilter: "",
          customerFilter: "",
        },
        error: null,
      }));
    }, []),

    handleOrderSelect: useCallback(
      (orderId: number) => {
        if (state.selectedRecord === orderId) {
          setState((prev) => ({ ...prev, showActionPopup: false }));
        } else {
          setState((prev) => ({
            ...prev,
            selectedRecord: orderId,
            showActionPopup: true,
          }));
        }
      },
      [state.selectedRecord]
    ),

    handleClosePopup: useCallback(() => {
      setState((prev) => ({ ...prev, showActionPopup: false }));
    }, []),

    handleDeleteClick: useCallback((id: number) => {
      setState((prev) => ({
        ...prev,
        selectedRecord: id,
        showDeleteConfirm: true,
        showActionPopup: false,
      }));
    }, []),

    confirmDelete: useCallback(async () => {
      if (state.selectedRecord === null) return;
      console.log("Deleting order with ID:", state.selectedRecord);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 500));

      setState((prev) => ({
        ...prev,
        orders: prev.orders.filter(
          (o) => o.customerId !== state.selectedRecord
        ),
        showDeleteConfirm: false,
        selectedRecord: null,
      }));
    }, [state.selectedRecord]),

    handleDateChange: useCallback((date: Date) => {
      setState((prev) => ({ ...prev, selectedDate: date, currentPage: 1 }));
    }, []),

    handleApplyFilter: useCallback((values: AdminFilterValues) => {
      setState((prev) => ({
        ...prev,
        filters: values,
        showFilterSheet: false,
        currentPage: 1,
      }));
    }, []),
  };

  const computed = {
    totalPages: Math.ceil(state.filteredOrders.length / ordersPerPage),
    paged: state.filteredOrders.slice(
      (state.currentPage - 1) * ordersPerPage,
      state.currentPage * ordersPerPage
    ),
    selectedOrder: state.orders.find(
      (o) => o.customerId === state.selectedRecord
    ),
  };

  return { state, actions, computed };
};
