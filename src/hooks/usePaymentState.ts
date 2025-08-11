import { useState, useEffect, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { Order, fetchOrdersByDate } from "@/static/mockPayment";

// ===== Constants =====
const ordersPerPage = 4;

// ===== Helper Functions =====
function calcStatistics(orders: Order[], selectedUnpaid: number[], selectedPaid: number[]) {
  const orderById = new Map(orders.map(o => [o.id, o]));
  const unpaid = orders.filter(o => !o.isPaid);
  const totalUnpaidAmount = unpaid.reduce((s, o) => s + (o.totalAmount ?? 0), 0);

  const sumByIds = (ids: number[]) =>
    ids.reduce((s, id) => s + (orderById.get(id)?.totalAmount ?? 0), 0);

  return {
    totalUnpaidOrders: unpaid.length,
    totalUnpaidAmount,
    selectedUnpaidOrdersCount: selectedUnpaid.length,
    selectedUnpaidAmount: sumByIds(selectedUnpaid),
    selectedPaidOrdersCount: selectedPaid.length,
    selectedPaidAmount: sumByIds(selectedPaid),
  };
}

// ===== Hook =====
export function usePaymentState() {
  // --- State ---
  const [initialLoading, setInitialLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUnpaidOrders, setSelectedUnpaidOrders] = useState<number[]>([]);
  const [selectedPaidOrders, setSelectedPaidOrders] = useState<number[]>([]);
  const [actualPayments, setActualPayments] = useState<Record<number, number>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // --- Derived basic ---
  const formattedDate = useMemo(() => format(selectedDate, "yyyy-MM-dd"), [selectedDate]);

  // --- Actions ---
  const loadData = useCallback(
    async (opts?: { fullScreen?: boolean }) => {
      const full = !!opts?.fullScreen;
      try {
        full ? setInitialLoading(true) : setFiltering(true);
        setError(null);

        const data = await fetchOrdersByDate(formattedDate);
        setOrders(data);
        setCurrentPage(1);
        setSelectedPaidOrders([]);
        setSelectedUnpaidOrders([]);
        setActualPayments({});
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải dữ liệu đơn hàng");
      } finally {
        setInitialLoading(false);
        setFiltering(false);
      }
    },
    [formattedDate]
  );

  useEffect(() => {
    loadData({ fullScreen: true });
  }, [loadData]);

  const refetchData = useCallback(() => loadData({ fullScreen: true }), [loadData]);

  const handleActualPaymentChange = useCallback((orderId: number, value: number) => {
    setActualPayments(prev => ({ ...prev, [orderId]: value }));
  }, []);

  const handleOrderSelect = useCallback((orderId: number, isPaid: boolean) => {
    if (isPaid) {
      setSelectedPaidOrders(prev =>
        prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
      );
    } else {
      setSelectedUnpaidOrders(prev => {
        const next = prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId];
        if (prev.includes(orderId)) {
          setActualPayments(ap => {
            const { [orderId]: _, ...rest } = ap;
            return rest;
          });
        }
        return next;
      });
    }
  }, []);

  // --- Derived complex ---
  const statistics = useMemo(
    () => calcStatistics(orders, selectedUnpaidOrders, selectedPaidOrders),
    [orders, selectedUnpaidOrders, selectedPaidOrders]
  );

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = useMemo(
    () => orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage),
    [orders, currentPage]
  );

  // --- Return groups ---
  const state = useMemo(
    () => ({
      loading: initialLoading,
      filtering,
      error,
      orders,
      currentPage,
      selectedUnpaidOrders,
      selectedPaidOrders,
      actualPayments,
      selectedDate,
      formattedDate,
    }),
    [
      initialLoading,
      filtering,
      error,
      orders,
      currentPage,
      selectedUnpaidOrders,
      selectedPaidOrders,
      actualPayments,
      selectedDate,
      formattedDate,
    ]
  );

  const actions = useMemo(
    () => ({
      setCurrentPage,
      setSelectedUnpaidOrders,
      setSelectedPaidOrders,
      setActualPayments,
      setSelectedDate,
      handleActualPaymentChange,
      handleOrderSelect,
      refetchData,
    }),
    [
      setCurrentPage,
      setSelectedUnpaidOrders,
      setSelectedPaidOrders,
      setActualPayments,
      setSelectedDate,
      handleActualPaymentChange,
      handleOrderSelect,
      refetchData,
    ]
  );

  const selectors = useMemo(
    () => ({ statistics, totalPages, currentOrders }),
    [statistics, totalPages, currentOrders]
  );

  return { state, actions, selectors };
}
