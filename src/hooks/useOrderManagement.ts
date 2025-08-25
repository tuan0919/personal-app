import { Order } from "@/types/api/admin/order-management-page-types";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { OrderService } from "@/api/admin/orderService";

// Keep filter shape compatible with AdminFilterSheet
interface AdminFilterValues {
  minPrice: number;
  maxPrice: number;
  iceCube: boolean; // Đá viên => orderType: "ĐÁ BI"
  iceBlock: boolean; // Đá cây => orderType: "ĐÁ CÂY"
  paymentStatus: "all" | "paid" | "unpaid";
  deliveryStatus: "all" | "delivered" | "pending";
  shipperFilter: string;
  customerFilter: string;
}

interface OrderManagementState {
  isLoading: boolean;
  orders: Order[];
  filteredOrders: Order[];
  selectedDate: Date;
  currentPage: number;
  selectedRecord: number | null; // use customer.id as selection key
  showActionPopup: boolean;
  showDeleteConfirm: boolean;
  showFilterSheet: boolean;
  filters: AdminFilterValues;
  error: string | null;
}

interface UseOrderManagementReturn {
  state: OrderManagementState;
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
    handleOrderSelect: (orderCustomerId: number) => void;
    handleClosePopup: () => void;
    handleDeleteClick: (id: number) => void;
    confirmDelete: () => Promise<void>;
    handleDateChange: (date: Date) => void;
    handleApplyFilter: (values: AdminFilterValues) => void;
  };
  computed: {
    totalPages: number;
    paged: Order[];
    selectedOrder: Order | undefined;
  };
}

export const useOrderManagement = (): UseOrderManagementReturn => {
  const [state, setState] = useState<OrderManagementState>({
    isLoading: true,
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
      maxPrice: 1_000_000,
      iceCube: true,
      iceBlock: true,
      paymentStatus: "all",
      deliveryStatus: "all",
      shipperFilter: "",
      customerFilter: "",
    },
    error: null,
  });

  const ordersPerPage = 5;

  // Load and filter orders whenever date/filters change
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const all = await OrderService.getAllOrders();
        const dateStr = format(state.selectedDate, "yyyy-MM-dd");
        const ordersByDate = all.filter((o) => o.date === dateStr);

        const filtered = ordersByDate.filter((o) => {
          // Text filters
          if (
            state.filters.customerFilter &&
            !o.customer.name
              .toLowerCase()
              .includes(state.filters.customerFilter.toLowerCase())
          )
            return false;
          if (
            state.filters.shipperFilter &&
            !o.shipper.name
              .toLowerCase()
              .includes(state.filters.shipperFilter.toLowerCase())
          )
            return false;

          // Delivery status (mocked): assume delivered if paid
          if (state.filters.deliveryStatus !== "all") {
            const delivered = o.payStatus === "ĐÃ THANH TOÁN";
            if (
              (state.filters.deliveryStatus === "delivered" && !delivered) ||
              (state.filters.deliveryStatus === "pending" && delivered)
            )
              return false;
          }

          // Payment status
          if (state.filters.paymentStatus !== "all") {
            const isPaid = o.payStatus === "ĐÃ THANH TOÁN";
            if (
              (state.filters.paymentStatus === "paid" && !isPaid) ||
              (state.filters.paymentStatus === "unpaid" && isPaid)
            )
              return false;
          }

          // Ice types
          if (!state.filters.iceCube && o.orderType === "ĐÁ BI") return false;
          if (!state.filters.iceBlock && o.orderType === "ĐÁ CÂY") return false;

          // Price range (use total price)
          const total = (o.price || 0) * (o.amount || 0);
          if (total < state.filters.minPrice || total > state.filters.maxPrice)
            return false;

          return true;
        });

        if (!active) return;
        setState((prev) => ({
          ...prev,
          orders: ordersByDate,
          filteredOrders: filtered,
          isLoading: false,
          currentPage: 1,
        }));
      } catch {
        if (!active) return;
        setState((prev) => ({
          ...prev,
          error: "Failed to load orders",
          isLoading: false,
        }));
      }
    })();
    return () => {
      active = false;
    };
  }, [state.selectedDate, state.filters]);

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
      setState((prev) => ({ ...prev, filters: { ...prev.filters, ...filters } }));
    }, []),

    setError: useCallback((error: string | null) => {
      setState((prev) => ({ ...prev, error, isLoading: false }));
    }, []),

    resetState: useCallback(() => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        selectedDate: new Date(),
        filters: {
          minPrice: 0,
          maxPrice: 1_000_000,
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
      (orderCustomerId: number) => {
        setState((prev) => ({
          ...prev,
          selectedRecord:
            prev.selectedRecord === orderCustomerId ? null : orderCustomerId,
          showActionPopup: prev.selectedRecord !== orderCustomerId,
        }));
      },
      []
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
      setState((prev) => ({ ...prev, isLoading: true }));
      await new Promise((res) => setTimeout(res, 500));
      setState((prev) => ({
        ...prev,
        orders: prev.orders.filter((o) => o.customer.id !== prev.selectedRecord),
        filteredOrders: prev.filteredOrders.filter(
          (o) => o.customer.id !== prev.selectedRecord
        ),
        showDeleteConfirm: false,
        selectedRecord: null,
        isLoading: false,
      }));
    }, []),

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
    totalPages: Math.ceil(state.filteredOrders.length / ordersPerPage) || 1,
    paged: state.filteredOrders.slice(
      (state.currentPage - 1) * ordersPerPage,
      state.currentPage * ordersPerPage
    ),
    selectedOrder: state.orders.find((o) => o.customer.id === state.selectedRecord),
  };

  return { state, actions, computed };
};
