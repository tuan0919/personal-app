import React from "react";
import { FiCheckCircle, FiPercent } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { formatCurrency } from "@/utils/formatter";
import { ConfirmDialog as SharedConfirmDialog } from "@/components/shared/ConfirmDialog";

export interface ConfirmDialogProps {
  open: boolean;
  count: number;
  total: number;
  onClose: () => void;
  onConfirm: () => void;
  orderDetails?: Array<{
    id: number;
    customerName: string;
    actual: number;
    provisional: number;
    diffPercent: number;
  }>;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  count,
  total,
  onClose,
  onConfirm,
  orderDetails = [],
}) => {
  if (!open) return null;
  return (
    <SharedConfirmDialog
      open={open}
      title="Xác nhận thanh toán"
      message={`Bạn có chắc chắn muốn xác nhận ${count} hóa đơn đã thanh toán với tổng số tiền ${formatCurrency(total)}?`}
      onClose={onClose}
      onConfirm={onConfirm}
      icon={<FiCheckCircle className="text-green-500 text-2xl" />}
    >
      {orderDetails.length > 0 && (
        <div
          className="max-h-[30vh] sm:max-h-56 overflow-y-auto mb-4 bg-pink-50/60 rounded-xl p-2 border border-pink-100"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            overscrollBehavior: "contain",
            pointerEvents: "auto",
          }}
        >
          {orderDetails.map((od, idx) => (
            <div
              key={od.id}
              className="flex items-center gap-2 py-2 px-2 text-sm rounded hover:bg-pink-100/60 transition flex-wrap mb-2"
            >
              <span className="font-semibold text-gray-700">
                Đơn hàng {idx + 1}:
              </span>
              <FaMoneyBillTransfer className="text-green-500" title="Thực thu" />
              <span className="text-green-700 font-semibold">
                {formatCurrency(od.actual)}
              </span>
              <FiPercent className="text-blue-500" title="Chênh lệch %" />
              <span
                className={`font-semibold ${
                  od.diffPercent === 0
                    ? "text-gray-500"
                    : od.diffPercent > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {od.diffPercent}%
              </span>
            </div>
          ))}
        </div>
      )}
    </SharedConfirmDialog>
  );
};
