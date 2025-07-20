import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { allOrders } from "@/static/mock-data";

// Filter values for admin
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
  orders: typeof allOrders;
  filteredOrders: typeof allOrders;
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
    paged: typeof allOrders;
    selectedOrder: (typeof allOrders)[number] | undefined;
  };
}

export const useAdminState = (): UseAdminStateReturn => {
  const [state, setState] = useState<AdminState>({
    isLoading: false,
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

  const ordersPerPage = 4;

  // Load orders for selected date
  useEffect(() => {
    const loadOrders = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const dateStr = format(state.selectedDate, "yyyy-MM-dd");
        const ordersToday = allOrders.filter((o) => o.date === dateStr);

        setState((prev) => ({
          ...prev,
          orders: ordersToday,
          isLoading: false,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          error: "Không thể tải dữ liệu đơn hàng",
          isLoading: false,
        }));
      }
    };

    loadOrders();
  }, [state.selectedDate]);

  // Filter orders based on current filters
  useEffect(() => {
    const filtered = state.orders.filter((order) => {
      // Lọc theo khách hàng
      if (
        state.filters.customerFilter &&
        !order.customer
          .toLowerCase()
          .includes(state.filters.customerFilter.toLowerCase())
      ) {
        return false;
      }

      // Lọc theo người giao
      if (
        state.filters.shipperFilter &&
        !order.shipper
          .toLowerCase()
          .includes(state.filters.shipperFilter.toLowerCase())
      ) {
        return false;
      }

      // Lọc theo khoảng giá
      if (
        order.revenue < state.filters.minPrice ||
        order.revenue > state.filters.maxPrice
      ) {
        return false;
      }

      // Lọc theo loại đá
      if (!state.filters.iceCube && !state.filters.iceBlock) {
        return false;
      }

      return true;
    });

    setState((prev) => ({
      ...prev,
      filteredOrders: filtered,
      currentPage: 1, // Reset to first page when filters change
    }));
  }, [state.orders, state.filters]);

  const actions = {
    setLoading: useCallback((loading: boolean) => {
      setState((prev) => ({ ...prev, isLoading: loading }));
    }, []),

    setSelectedDate: useCallback((date: Date) => {
      setState((prev) => ({ ...prev, selectedDate: date, currentPage: 1 }));
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
      setState({
        isLoading: false,
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
      if (state.selectedRecord) {
        try {
          setState((prev) => ({ ...prev, isLoading: true }));

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Remove order from list
          setState((prev) => ({
            ...prev,
            orders: prev.orders.filter((o) => o.id !== state.selectedRecord),
            selectedRecord: null,
            showDeleteConfirm: false,
            isLoading: false,
          }));
        } catch {
          setState((prev) => ({
            ...prev,
            error: "Không thể xóa đơn hàng",
            isLoading: false,
          }));
        }
      }
    }, [state.selectedRecord]),

    handleDateChange: useCallback((date: Date) => {
      setState((prev) => ({
        ...prev,
        selectedDate: date,
        currentPage: 1,
        isLoading: true,
      }));
    }, []),

    handleApplyFilter: useCallback((values: AdminFilterValues) => {
      setState((prev) => ({
        ...prev,
        filters: values,
        isLoading: true,
      }));
    }, []),
  };

  const computed = {
    totalPages: Math.max(
      1,
      Math.ceil(state.filteredOrders.length / ordersPerPage)
    ),
    paged: state.filteredOrders.slice(
      (state.currentPage - 1) * ordersPerPage,
      state.currentPage * ordersPerPage
    ),
    selectedOrder: state.selectedRecord
      ? state.orders.find((o) => o.id === state.selectedRecord)
      : undefined,
  };

  return { state, actions, computed };
};
