import { Customer, FilterValues } from "./types";
import { format } from "date-fns";

// Mock data - in a real app this would come from a backend API
const mockCustomers: Customer[] = [
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

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class CustomerService {
  static async getAllCustomers(): Promise<Customer[]> {
    await delay(1000); // 1s loading
    return [...mockCustomers];
  }

  static async getDeliveredCustomers(date?: string): Promise<Customer[]> {
    await delay(1500); // Tăng từ 300ms lên 1500ms

    if (!date) {
      // Nếu không có date, trả về tất cả khách đã giao
      return mockCustomers.filter((customer) => customer.delivered);
    }

    // Nếu có date, trả về khách đã giao và có ngày giao hàng trùng với date
    return mockCustomers.filter((customer) => {
      // @ts-expect-error - Sử dụng trường deliveryDate đã thêm ở trên
      return customer.delivered && customer.deliveryDate === date;
    });
  }

  static async getFilteredCustomers(
    filters: FilterValues
  ): Promise<Customer[]> {
    await delay(400);

    return mockCustomers.filter((customer) => {
      if (
        filters.paymentStatus &&
        customer.paymentStatus !== filters.paymentStatus
      ) {
        return false;
      }
      if (filters.productType && customer.productType !== filters.productType) {
        return false;
      }
      if (
        filters.delivered !== undefined &&
        customer.delivered !== filters.delivered
      ) {
        return false;
      }
      if (filters.date) {
        // @ts-expect-error - Sử dụng trường deliveryDate đã thêm ở trên
        if (customer.deliveryDate !== filters.date) {
          return false;
        }
      }
      // Lọc theo khoảng giá
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        // Giả sử amount * 10000 là giá trị tiền tương ứng
        const customerPrice = customer.amount * 10000;
        if (customerPrice < min || customerPrice > max) {
          return false;
        }
      }
      return true;
    });
  }

  static async updateCustomer(
    customerId: number,
    updates: Partial<Customer>
  ): Promise<Customer> {
    await delay(300);

    const customerIndex = mockCustomers.findIndex(
      (c) => c.customerId === customerId
    );
    if (customerIndex === -1) {
      throw new Error("Customer not found");
    }

    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      ...updates,
    };
    return mockCustomers[customerIndex];
  }

  static async deleteCustomer(customerId: number): Promise<void> {
    await delay(300);

    const customerIndex = mockCustomers.findIndex(
      (c) => c.customerId === customerId
    );
    if (customerIndex === -1) {
      throw new Error("Customer not found");
    }

    mockCustomers.splice(customerIndex, 1);
  }
}
