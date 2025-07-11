// src/static/mockCustomers.ts

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

export const allCustomers: Customer[] = [
  {
    customerId: 1,
    customerName: "Khách 1",
    address: "1 Đường ABC",
    deliveryTime: "08:00",
    delivered: true,
    productType: 1,
    amount: 10,
    paymentStatus: "paid",
  },
  {
    customerId: 2,
    customerName: "Khách 2",
    address: "2 Ngõ XYZ",
    deliveryTime: "09:30",
    delivered: true,
    productType: 2,
    amount: 5,
    paymentStatus: "unpaid",
  },
  {
    customerId: 3,
    customerName: "Khách 3",
    address: "3 Lê Lợi",
    deliveryTime: "10:15",
    delivered: false,
    productType: 1,
    amount: 8,
    paymentStatus: "unpaid",
  },
  {
    customerId: 4,
    customerName: "Khách 4",
    address: "4 Trần Phú",
    deliveryTime: "11:00",
    delivered: true,
    productType: 2,
    amount: 12,
    paymentStatus: "paid",
  },
  {
    customerId: 1,
    customerName: "Khách 1",
    address: "1 Đường ABC",
    deliveryTime: "08:00",
    delivered: true,
    productType: 1,
    amount: 10,
    paymentStatus: "paid",
  },
  {
    customerId: 2,
    customerName: "Khách 2",
    address: "2 Ngõ XYZ",
    deliveryTime: "09:30",
    delivered: true,
    productType: 2,
    amount: 5,
    paymentStatus: "unpaid",
  },
  {
    customerId: 3,
    customerName: "Khách 3",
    address: "3 Lê Lợi",
    deliveryTime: "10:15",
    delivered: false,
    productType: 1,
    amount: 8,
    paymentStatus: "unpaid",
  },
  {
    customerId: 4,
    customerName: "Khách 4",
    address: "4 Trần Phú",
    deliveryTime: "11:00",
    delivered: true,
    productType: 2,
    amount: 12,
    paymentStatus: "paid",
  },
  {
    customerId: 1,
    customerName: "Khách 1",
    address: "1 Đường ABC",
    deliveryTime: "08:00",
    delivered: true,
    productType: 1,
    amount: 10,
    paymentStatus: "paid",
  },
  {
    customerId: 2,
    customerName: "Khách 2",
    address: "2 Ngõ XYZ",
    deliveryTime: "09:30",
    delivered: true,
    productType: 2,
    amount: 5,
    paymentStatus: "unpaid",
  },
  {
    customerId: 3,
    customerName: "Khách 3",
    address: "3 Lê Lợi",
    deliveryTime: "10:15",
    delivered: false,
    productType: 1,
    amount: 8,
    paymentStatus: "unpaid",
  },
  {
    customerId: 4,
    customerName: "Khách 4",
    address: "4 Trần Phú",
    deliveryTime: "11:00",
    delivered: true,
    productType: 2,
    amount: 12,
    paymentStatus: "paid",
  },
];
