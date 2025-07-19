import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { Order, fetchOrdersByDate } from "@/static/mockPayment";

export interface UsePaymentStateReturn {
  // Trạng thái
  loading: boolean;
  filtering: boolean; // Đang lọc/sắp xếp không phải load lần đầu
  error: string | null;

  // Dữ liệu đơn hàng
  orders: Order[];

  // Quản lý trang và lựa chọn
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedUnpaidOrders: number[];
  setSelectedUnpaidOrders: (orderId: number[]) => void;
  selectedPaidOrders: number[];
  setSelectedPaidOrders: (orderId: number[]) => void;

  // Quản lý thanh toán
  actualPayments: Record<number, number>;
  setActualPayments: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >;
  handleActualPaymentChange: (orderId: number, value: number) => void;

  // Quản lý chọn đơn hàng
  handleOrderSelect: (orderId: number, isPaid: boolean) => void;

  // Lọc theo ngày
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  formattedDate: string;

  // Reload data
  refetchData: () => Promise<void>;
}

export function usePaymentState(): UsePaymentStateReturn {
  // Trạng thái loading và error
  const [initialLoading, setInitialLoading] = useState(true); // Loading lần đầu
  const [filtering, setFiltering] = useState(false); // Loading khi filter
  const [firstLoad, setFirstLoad] = useState(true); // Đánh dấu lần load đầu tiên
  const [error, setError] = useState<string | null>(null);

  // Dữ liệu đơn hàng
  const [orders, setOrders] = useState<Order[]>([]);

  // Quản lý trang
  const [currentPage, setCurrentPage] = useState(1);

  // Quản lý chọn đơn hàng
  const [selectedUnpaidOrders, setSelectedUnpaidOrders] = useState<number[]>(
    []
  );
  const [selectedPaidOrders, setSelectedPaidOrders] = useState<number[]>([]);

  // Quản lý thanh toán thực tế
  const [actualPayments, setActualPayments] = useState<Record<number, number>>(
    {}
  );

  // Lọc theo ngày
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  // Hàm load dữ liệu
  const loadData = useCallback(async () => {
    try {
      if (firstLoad) {
        setInitialLoading(true);
      } else {
        setFiltering(true);
      }
      setError(null);

      // Lấy đơn hàng theo ngày đã chọn
      const data = await fetchOrdersByDate(formattedDate);
      setOrders(data);

      // Reset về trang đầu tiên khi thay đổi ngày
      setCurrentPage(1);

      // Xóa các đơn hàng được chọn khi đổi ngày
      setSelectedPaidOrders([]);
      setSelectedUnpaidOrders([]);
      setActualPayments({});
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không thể tải dữ liệu đơn hàng"
      );
    } finally {
      setInitialLoading(false);
      setFiltering(false);
      if (firstLoad) {
        setFirstLoad(false);
      }
    }
  }, [formattedDate, firstLoad]);

  // Load dữ liệu khi thay đổi ngày
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Xử lý thay đổi giá trị thanh toán thực tế
  const handleActualPaymentChange = useCallback(
    (orderId: number, value: number) => {
      setActualPayments((prev) => ({ ...prev, [orderId]: value }));
    },
    []
  );

  // Xử lý chọn đơn hàng
  const handleOrderSelect = useCallback((orderId: number, isPaid: boolean) => {
    if (isPaid) {
      // Xử lý đơn hàng đã thanh toán
      setSelectedPaidOrders((prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId]
      );
    } else {
      // Xử lý đơn hàng chưa thanh toán
      setSelectedUnpaidOrders((prev) => {
        const newArr = prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId];

        // Nếu bỏ chọn thì xóa actualPayments
        if (prev.includes(orderId)) {
          setActualPayments((ap) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [orderId]: removed, ...rest } = ap;
            return rest;
          });
        }
        return newArr;
      });
    }
  }, []);

  // Reload dữ liệu
  const refetchData = useCallback(async () => {
    setFirstLoad(true); // Reset để hiện loading full màn hình
    await loadData();
  }, [loadData]);

  return {
    // Trạng thái
    loading: initialLoading,
    filtering,
    error,

    // Dữ liệu đơn hàng
    orders,

    // Quản lý trang và lựa chọn
    currentPage,
    setCurrentPage,
    selectedUnpaidOrders,
    setSelectedUnpaidOrders,
    selectedPaidOrders,
    setSelectedPaidOrders,

    // Quản lý thanh toán
    actualPayments,
    setActualPayments,
    handleActualPaymentChange,

    // Quản lý chọn đơn hàng
    handleOrderSelect,

    // Lọc theo ngày
    selectedDate,
    setSelectedDate,
    formattedDate,

    // Reload data
    refetchData,
  };
}
