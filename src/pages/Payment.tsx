import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDollarSign,
  FiClock,
  FiCheck,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiPackage,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";
import BottomNav from "@/components/BottomNav";
import PaymentNavbar from "@/components/Payment/PaymentNavbar";

// Mock Data (giữ nguyên)
const mockOrders = [
  {
    id: 1,
    customerName: "Nguyễn Văn An",
    address: "123 Đường ABC, Quận 1",
    phone: "0901234567",
    deliveryDate: "2025-07-10",
    deliveryTime: "14:30",
    products: [
      { type: "Đá cây", quantity: 2, price: 10000 },
      { type: "Đá viên", quantity: 1, price: 15000 },
    ],
    totalAmount: 35000,
    isPaid: false,
    notes: "Giao tại cổng chính",
  },
  {
    id: 2,
    customerName: "Trần Thị Bình",
    address: "456 Đường DEF, Quận 3",
    phone: "0912345678",
    deliveryDate: "2025-07-09",
    deliveryTime: "10:15",
    products: [{ type: "Đá viên", quantity: 3, price: 15000 }],
    totalAmount: 45000,
    isPaid: true,
    notes: "",
  },
  {
    id: 3,
    customerName: "Lê Văn Cường",
    address: "789 Đường GHI, Quận 7",
    phone: "0923456789",
    deliveryDate: "2025-07-11",
    deliveryTime: "16:45",
    products: [{ type: "Đá cây", quantity: 5, price: 10000 }],
    totalAmount: 50000,
    isPaid: false,
    notes: "Khách yêu cầu gọi trước 15 phút",
  },
  {
    id: 4,
    customerName: "Phạm Thị Dung",
    address: "321 Đường JKL, Quận 5",
    phone: "0934567890",
    deliveryDate: "2025-07-08",
    deliveryTime: "09:30",
    products: [
      { type: "Đá cây", quantity: 1, price: 10000 },
      { type: "Đá viên", quantity: 2, price: 15000 },
    ],
    totalAmount: 40000,
    isPaid: false,
    notes: "",
  },
  {
    id: 5,
    customerName: "Hoàng Văn Em",
    address: "654 Đường MNO, Quận 2",
    phone: "0945678901",
    deliveryDate: "2025-07-12",
    deliveryTime: "11:20",
    products: [{ type: "Đá viên", quantity: 4, price: 15000 }],
    totalAmount: 60000,
    isPaid: false,
    notes: "Giao tại tầng 3",
  },
  {
    id: 6,
    customerName: "Vũ Thị Phượng",
    address: "987 Đường PQR, Quận 4",
    phone: "0956789012",
    deliveryDate: "2025-07-07",
    deliveryTime: "13:45",
    products: [{ type: "Đá cây", quantity: 3, price: 10000 }],
    totalAmount: 30000,
    isPaid: true,
    notes: "",
  },
];

export const Payment: React.FC = () => {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const ordersPerPage = 4;

  // Tính toán thống kê
  const statistics = useMemo(() => {
    const unpaidOrders = mockOrders.filter((order) => !order.isPaid);
    const totalUnpaidAmount = unpaidOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const selectedAmount = selectedOrders.reduce((sum, orderId) => {
      const order = mockOrders.find((o) => o.id === orderId);
      return sum + (order ? order.totalAmount : 0);
    }, 0);

    return {
      totalUnpaidOrders: unpaidOrders.length,
      totalUnpaidAmount,
      selectedOrdersCount: selectedOrders.length,
      selectedAmount,
    };
  }, [selectedOrders]);

  // Phân trang
  const totalPages = Math.ceil(mockOrders.length / ordersPerPage);
  const currentOrders = mockOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleOrderSelect = (orderId: number, isPaid: boolean) => {
    if (isPaid) return;

    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCollectPayment = () => {
    setShowConfirmDialog(true);
  };

  const confirmPayment = () => {
    console.log("Thu tiền cho các đơn:", selectedOrders);
    setSelectedOrders([]);
    setShowConfirmDialog(false);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Animation variants để smooth hơn
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <PaymentNavbar />
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thu Tiền Đơn Hàng
          </h1>
          <p className="text-gray-600">
            Quản lý thanh toán các đơn hàng đã giao
          </p>
        </motion.div>

        {/* Statistics Cards - Compact Grid Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiDollarSign className="text-pink-600 text-lg" />
              </div>
              <p className="text-gray-600 text-xs mb-1">Tổng tiền cần thu</p>
              <p className="text-lg font-bold text-pink-600">
                {formatCurrency(statistics.totalUnpaidAmount)}
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiClock className="text-orange-600 text-lg" />
              </div>
              <p className="text-gray-600 text-xs mb-1">Đơn chưa thanh toán</p>
              <p className="text-lg font-bold text-orange-600">
                {statistics.totalUnpaidOrders}
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiCheck className="text-green-600 text-lg" />
              </div>
              <p className="text-gray-600 text-xs mb-1">Đã chọn thu</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(statistics.selectedAmount)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Orders Section - Wrapped in unified container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-pink-100 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FiPackage className="mr-2 text-pink-600" />
            Danh sách đơn hàng
          </h2>

          {/* Orders List with improved animation */}
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4 mb-6"
          >
            <AnimatePresence mode="wait">
              {currentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  variants={cardVariants}
                  layout
                  className={`backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 transition-all duration-300 cursor-pointer ${
                    order.isPaid
                      ? "border-green-200 bg-green-50/50"
                      : selectedOrders.includes(order.id)
                      ? "border-pink-400 bg-pink-50/50 shadow-lg scale-[1.02]"
                      : "border-gray-200 hover:border-pink-300 hover:shadow-md"
                  }`}
                  onClick={() => handleOrderSelect(order.id, order.isPaid)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          order.isPaid
                            ? "bg-green-500 border-green-500"
                            : selectedOrders.includes(order.id)
                            ? "bg-pink-500 border-pink-500"
                            : "border-gray-300"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {(order.isPaid ||
                          selectedOrders.includes(order.id)) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FiCheck className="text-white text-xs" />
                          </motion.div>
                        )}
                      </motion.div>
                      <div className="flex items-center space-x-2">
                        <FiUser className="text-gray-500" />
                        <span className="font-semibold text-gray-800">
                          {order.customerName}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiMapPin className="text-pink-500" />
                      <span className="text-sm">{order.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiCalendar className="text-pink-500" />
                      <span className="text-sm">
                        {formatDate(order.deliveryDate)} - {order.deliveryTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <FiPackage className="text-pink-500" />
                        <span className="text-sm text-gray-600">
                          {order.products
                            .map((p) => `${p.type} x${p.quantity}`)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-pink-600">
                        {formatCurrency(order.totalAmount)}
                      </div>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-3 p-3 bg-gray-50/80 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Ghi chú:</strong> {order.notes}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination - Inside the section */}
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors"
            >
              <FiChevronLeft className="text-gray-600" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-pink-50 border border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors"
            >
              <FiChevronRight className="text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Collect Payment Button - Fixed at proper position */}
        <AnimatePresence>
          {selectedOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="sticky bottom-30 z-99"
            >
              <div className="max-w-md mx-auto">
                <motion.button
                  onClick={handleCollectPayment}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiDollarSign className="text-xl" />
                  <span>
                    Thu tiền {selectedOrders.length} hóa đơn -{" "}
                    {formatCurrency(statistics.selectedAmount)}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {showConfirmDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-pink-100"
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <FiCheckCircle className="text-green-500 text-2xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Xác nhận thu tiền
                  </h3>
                  <p className="text-gray-600">
                    Bạn có chắc chắn muốn thu tiền {selectedOrders.length} hóa
                    đơn với tổng số tiền{" "}
                    <span className="font-bold text-pink-600">
                      {formatCurrency(statistics.selectedAmount)}
                    </span>
                    ?
                  </p>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setShowConfirmDialog(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Hủy
                  </motion.button>
                  <motion.button
                    onClick={confirmPayment}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Xác nhận thu
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-16"></div>
      <BottomNav />
    </div>
  );
};
