import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { PaymentStatistics } from "./PaymentStatistics";
import { OrderCard } from "./OrderCard";
import { ActionButtons } from "./ActionButtons";
import { ConfirmDialog } from "./ConfirmDialog";
import { CancelDialog } from "./CancelDialog";
import { usePaymentState } from "@/hooks/usePaymentState";
import { Customer } from "@/api/types";
import { PaymentService } from "@/services/paymentService";
import { useApp } from "@/context/AppContext";

export function PaymentView() {
  const { state, actions } = usePaymentState();
  const { loading, customers, selectedCustomers } = state;
  const {
    setLoading,
    setCustomers,
    toggleSelectCustomer,
    selectAllCustomers,
    clearSelectedCustomers,
  } = actions;
  const { addNotification } = useApp();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Lấy danh sách khách hàng chưa thanh toán khi component mount
  useEffect(() => {
    const fetchUnpaidCustomers = async () => {
      setLoading(true);
      try {
        const unpaidCustomers = await PaymentService.getUnpaidCustomers();
        setCustomers(unpaidCustomers);
      } catch (error) {
        console.error("Error fetching unpaid customers:", error);
        addNotification("Không thể tải danh sách khách hàng", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidCustomers();
  }, []);

  // Tính toán thống kê thanh toán
  const statistics = useMemo(() => {
    const totalUnpaidAmount = PaymentService.calculateTotalAmountDue(customers);
    const selectedUnpaidAmount =
      PaymentService.calculateTotalAmountDue(selectedCustomers);

    return {
      totalUnpaidAmount,
      totalUnpaidOrders: customers.length,
      selectedUnpaidAmount,
    };
  }, [customers, selectedCustomers]);

  // Xử lý thanh toán
  const handleConfirmPayment = async () => {
    if (selectedCustomers.length === 0) return;

    setLoading(true);
    try {
      // Xử lý thanh toán cho từng khách hàng đã chọn
      for (const customer of selectedCustomers) {
        await PaymentService.processPayment(customer.customerId);
      }

      // Cập nhật danh sách khách hàng chưa thanh toán
      const unpaidCustomers = await PaymentService.getUnpaidCustomers();
      setCustomers(unpaidCustomers);
      clearSelectedCustomers();

      // Thông báo thành công
      addNotification(
        `Đã thanh toán ${selectedCustomers.length} đơn hàng`,
        "success"
      );
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      addNotification("Lỗi khi xử lý thanh toán", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-6"
      >
        Quản lý thanh toán
      </motion.h1>

      <PaymentStatistics
        totalUnpaidAmount={statistics.totalUnpaidAmount}
        totalUnpaidOrders={statistics.totalUnpaidOrders}
        selectedUnpaidAmount={statistics.selectedUnpaidAmount}
      />

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-12 bg-white/70 rounded-xl shadow-md">
          <p className="text-gray-500">Không có đơn hàng nào cần thanh toán</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customers.map((customer) => (
            <OrderCard
              key={customer.customerId}
              customer={customer}
              isSelected={selectedCustomers.some(
                (c) => c.customerId === customer.customerId
              )}
              onSelect={() => toggleSelectCustomer(customer)}
            />
          ))}
        </div>
      )}

      <ActionButtons
        onConfirm={() => setShowConfirmDialog(true)}
        onCancel={() => setShowCancelDialog(true)}
        onSelectAll={() => selectAllCustomers()}
        disabled={customers.length === 0 || loading}
        selectedCount={selectedCustomers.length}
      />

      <ConfirmDialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmPayment}
        amount={statistics.selectedUnpaidAmount}
        count={selectedCustomers.length}
      />

      <CancelDialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={() => {
          clearSelectedCustomers();
          setShowCancelDialog(false);
        }}
      />
    </div>
  );
}
