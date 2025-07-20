import { Customer } from "../api/types";
import { format } from "date-fns";

// Mock data - in a real app this would come from a backend API
export const mockCustomers: Customer[] = [
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
  // Duplicate entries for testing pagination
  {
    customerId: 5,
    customerName: "Khách 5",
    address: "5 Đường DEF",
    deliveryTime: "12:00",
    delivered: true,
    productType: 1,
    amount: 15,
    paymentStatus: "paid",
  },
  {
    customerId: 6,
    customerName: "Khách 6",
    address: "6 Ngõ GHI",
    deliveryTime: "13:30",
    delivered: false,
    productType: 2,
    amount: 7,
    paymentStatus: "unpaid",
  },
];

// Thêm trường deliveryDate cho từng customer nếu chưa có
mockCustomers.forEach((customer) => {
  if (!("deliveryDate" in customer)) {
    // @ts-expect-error - Thêm trường deliveryDate
    customer.deliveryDate = format(new Date(), "yyyy-MM-dd"); // Default là ngày hôm nay
  }
});
