// src/static/admin/mockCustomers.ts

export type PaymentStatus = "paid" | "unpaid";

export interface Shipper {
  id: number;
  name: string;
}

export interface Customer {
  customerId: number;
  customerName: string;
  address: string;
  deliveryTime: string;
  delivered: boolean;
  productType: number; // 1 = Đá cây, 2 = Đá viên
  amount: number; // Số lượng đã giao
  paymentStatus: PaymentStatus; // Tình trạng thanh toán
  shipper: Shipper;
  date: string; // YYYY-MM-DD
}

const shippers: Shipper[] = [
  { id: 1, name: "Nguyễn Tuấn" },
  { id: 2, name: "Trần Văn Minh" },
  { id: 3, name: "Lê Thị Hương" },
  { id: 4, name: "Phạm Quốc Bảo" },
];

function getTodayString() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayString = yesterday.toISOString().split("T")[0];

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
    shipper: shippers[0],
    date: getTodayString(),
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
    shipper: shippers[1],
    date: getTodayString(),
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
    shipper: shippers[2],
    date: getTodayString(),
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
    shipper: shippers[3],
    date: getTodayString(),
  },
  {
    customerId: 5,
    customerName: "Khách 5 (Hôm qua)",
    address: "1 Đường ABC",
    deliveryTime: "08:00",
    delivered: true,
    productType: 1,
    amount: 10,
    paymentStatus: "paid",
    shipper: shippers[0],
    date: yesterdayString,
  },
  {
    customerId: 6,
    customerName: "Khách 6 (Hôm qua)",
    address: "2 Ngõ XYZ",
    deliveryTime: "09:30",
    delivered: true,
    productType: 2,
    amount: 5,
    paymentStatus: "unpaid",
    shipper: shippers[1],
    date: yesterdayString,
  },
  {
    customerId: 7,
    customerName: "Khách 7",
    address: "3 Lê Lợi",
    deliveryTime: "10:15",
    delivered: false,
    productType: 1,
    amount: 8,
    paymentStatus: "unpaid",
    shipper: shippers[2],
    date: getTodayString(),
  },
  {
    customerId: 8,
    customerName: "Khách 8",
    address: "4 Trần Phú",
    deliveryTime: "11:00",
    delivered: true,
    productType: 2,
    amount: 12,
    paymentStatus: "paid",
    shipper: shippers[3],
    date: getTodayString(),
  },
  {
    customerId: 9,
    customerName: "Khách 9 (Hôm qua)",
    address: "1 Đường ABC",
    deliveryTime: "08:00",
    delivered: true,
    productType: 1,
    amount: 10,
    paymentStatus: "paid",
    shipper: shippers[0],
    date: yesterdayString,
  },
  {
    customerId: 10,
    customerName: "Khách 10",
    address: "2 Ngõ XYZ",
    deliveryTime: "09:30",
    delivered: true,
    productType: 2,
    amount: 5,
    paymentStatus: "unpaid",
    shipper: shippers[1],
    date: getTodayString(),
  },
  {
    customerId: 11,
    customerName: "Khách 11",
    address: "3 Lê Lợi",
    deliveryTime: "10:15",
    delivered: false,
    productType: 1,
    amount: 8,
    paymentStatus: "unpaid",
    shipper: shippers[2],
    date: getTodayString(),
  },
  {
    customerId: 12,
    customerName: "Khách 12 (Hôm qua)",
    address: "4 Trần Phú",
    deliveryTime: "11:00",
    delivered: true,
    productType: 2,
    amount: 12,
    paymentStatus: "paid",
    shipper: shippers[3],
    date: yesterdayString,
  },
  // Thêm nhiều đơn hàng hơn cho ngày hiện tại để tạo nhiều trang
  {
    customerId: 13,
    customerName: "Khách 13",
    address: "5 Nguyễn Huệ",
    deliveryTime: "13:00",
    delivered: true,
    productType: 1,
    amount: 7,
    paymentStatus: "paid",
    shipper: shippers[0],
    date: getTodayString(),
  },
  {
    customerId: 14,
    customerName: "Khách 14",
    address: "6 Lý Tự Trọng",
    deliveryTime: "14:30",
    delivered: false,
    productType: 2,
    amount: 9,
    paymentStatus: "unpaid",
    shipper: shippers[1],
    date: getTodayString(),
  },
  {
    customerId: 15,
    customerName: "Khách 15",
    address: "7 Nguyễn Du",
    deliveryTime: "15:45",
    delivered: true,
    productType: 1,
    amount: 11,
    paymentStatus: "paid",
    shipper: shippers[2],
    date: getTodayString(),
  },
  {
    customerId: 16,
    customerName: "Khách 16",
    address: "8 Phan Chu Trinh",
    deliveryTime: "16:20",
    delivered: false,
    productType: 2,
    amount: 6,
    paymentStatus: "unpaid",
    shipper: shippers[3],
    date: getTodayString(),
  },
];
