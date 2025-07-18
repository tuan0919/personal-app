// API types
export type PaymentStatus = "paid" | "unpaid";

export interface Customer {
  customerId: number;
  customerName: string;
  address: string;
  deliveryTime: string;
  delivered: boolean;
  productType: number; // 1 = Đá cây, 2 = Đá viên
  amount: number; // Số lượng đã giao
  paymentStatus: PaymentStatus; // Tình trạng thanh toán
}

export interface FilterValues {
  paymentStatus?: PaymentStatus;
  productType?: number;
  delivered?: boolean;
}
