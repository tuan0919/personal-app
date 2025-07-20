import { Customer, FilterValues } from "./types";
import { mockCustomers } from "../mocks/mockCustomers";
import { format } from "date-fns";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Service class để gọi API liên quan đến Customer
 */
export class CustomerService {
  /**
   * Lấy tất cả khách hàng
   */
  static async getAllCustomers(): Promise<Customer[]> {
    await delay(1000); // 1s loading
    return [...mockCustomers];
  }

  /**
   * Lấy khách hàng đã giao hàng theo ngày
   */
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

  /**
   * Lấy khách hàng theo bộ lọc
   */
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

  /**
   * Cập nhật thông tin khách hàng
   */
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

  /**
   * Xóa khách hàng
   */
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
