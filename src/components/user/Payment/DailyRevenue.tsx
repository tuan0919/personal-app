// components/Payment/DailyRevenue.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { CalendarChooser } from "@/components/shared/CalendarChooser";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { mockOrders } from "@/static/mockPayment";
import { cardVariants } from "@/components/shared/animations";

interface DailyRevenueProps {
  className?: string;
}

export function DailyRevenue({ className }: DailyRevenueProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Tính tổng tiền thu trong ngày đã chọn
  const dailyRevenue = useMemo(() => {
    // Chuyển đổi Date thành string theo định dạng yyyy-mm-dd
    const selectedDateString = selectedDate.toISOString().split("T")[0];

    // Lọc các đơn hàng đã thanh toán và có ngày thu tiền trùng với ngày đã chọn
    const paidOrdersOnDate = mockOrders.filter(
      (order) =>
        order.isPaid && order.paymentCollectedDate === selectedDateString
    );

    const totalRevenue = paidOrdersOnDate.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    return {
      total: totalRevenue,
      orders: paidOrdersOnDate,
      count: paidOrdersOnDate.length,
    };
  }, [selectedDate]);

  return (
    <motion.div variants={cardVariants} className={`${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center justify-between space-x-3">
          <div>
            <h3 className="font-semibold text-gray-800">
              Thống kê trong ngày:
            </h3>
          </div>
          <CalendarChooser date={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Tổng doanh thu */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Tổng doanh thu
            </span>
            <FiTrendingUp className="text-green-600" />
          </div>
          <div className="text-xl font-bold text-green-800">
            {formatCurrency(dailyRevenue.total)}
          </div>
        </motion.div>

        {/* Số đơn hàng */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Số đơn hàng
            </span>
            <FiDollarSign className="text-blue-600" />
          </div>
          <div className="text-xl font-bold text-blue-800">
            {dailyRevenue.count}
          </div>
        </motion.div>
      </div>

      {/* Chi tiết các đơn hàng trong ngày */}
      {dailyRevenue.orders.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            Chi tiết đơn hàng ({dailyRevenue.count} đơn):
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {dailyRevenue.orders.map((order) => (
              <motion.div
                key={order.id}
                className="flex items-center shadow justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">
                    {order.customerName}
                  </div>
                  <div className="text-xs text-gray-600">
                    Giao: {formatDate(order.deliveryDate)} -{" "}
                    {order.deliveryTime}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {formatCurrency(order.totalAmount)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Thông báo khi không có doanh thu */}
      {dailyRevenue.orders.length === 0 && (
        <div className="mt-6 text-center py-8">
          <div className="text-gray-400 text-lg mb-2">📊</div>
          <p className="text-gray-500 text-sm">
            Không có doanh thu trong ngày{" "}
            {formatDate(selectedDate.toISOString().split("T")[0])}
          </p>
        </div>
      )}
    </motion.div>
  );
}
