import { Customer, FilterValues } from "../api/types";
import { CustomerService as CustomerAPI } from "../api/customerService";

/**
 * Service class để xử lý logic business liên quan đến Customer
 */
export class CustomerService {
  /**
   * Lấy tất cả khách hàng và thực hiện xử lý dữ liệu nếu cần
   */
  static async getAllCustomers(): Promise<Customer[]> {
    const customers = await CustomerAPI.getAllCustomers();
    return customers;
  }

  /**
   * Lấy khách hàng đã giao hàng theo ngày
   */
  static async getDeliveredCustomers(date?: string): Promise<Customer[]> {
    const customers = await CustomerAPI.getDeliveredCustomers(date);
    return customers;
  }

  /**
   * Lấy khách hàng theo bộ lọc và thực hiện xử lý dữ liệu nếu cần
   */
  static async getFilteredCustomers(
    filters: FilterValues
  ): Promise<Customer[]> {
    const customers = await CustomerAPI.getFilteredCustomers(filters);
    return customers;
  }

  /**
   * Cập nhật thông tin khách hàng
   */
  static async updateCustomer(
    customerId: number,
    updates: Partial<Customer>
  ): Promise<Customer> {
    const updatedCustomer = await CustomerAPI.updateCustomer(
      customerId,
      updates
    );
    return updatedCustomer;
  }

  /**
   * Xóa khách hàng
   */
  static async deleteCustomer(customerId: number): Promise<void> {
    await CustomerAPI.deleteCustomer(customerId);
  }

  /**
   * Tính tổng doanh thu từ danh sách khách hàng
   */
  static calculateTotalRevenue(customers: Customer[]): number {
    return customers.reduce((total, customer) => {
      // Giả sử amount * 10000 là giá trị tiền tương ứng
      return total + customer.amount * 10000;
    }, 0);
  }

  /**
   * Tính số lượng khách hàng đã thanh toán
   */
  static countPaidCustomers(customers: Customer[]): number {
    return customers.filter((customer) => customer.paymentStatus === "paid")
      .length;
  }

  /**
   * Tính số lượng khách hàng chưa thanh toán
   */
  static countUnpaidCustomers(customers: Customer[]): number {
    return customers.filter((customer) => customer.paymentStatus === "unpaid")
      .length;
  }
}
