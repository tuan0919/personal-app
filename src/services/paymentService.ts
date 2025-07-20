import { Customer } from "@/api/types";
import { CustomerService as CustomerAPI } from "@/api/customerService";

/**
 * Service class để xử lý logic business liên quan đến Payment
 */
export class PaymentService {
  /**
   * Lấy danh sách khách hàng chưa thanh toán
   */
  static async getUnpaidCustomers(): Promise<Customer[]> {
    const customers = await CustomerAPI.getAllCustomers();
    return customers.filter((customer) => customer.paymentStatus === "unpaid");
  }

  /**
   * Xử lý thanh toán cho khách hàng
   */
  static async processPayment(customerId: number): Promise<Customer> {
    // Cập nhật trạng thái thanh toán
    const updatedCustomer = await CustomerAPI.updateCustomer(customerId, {
      paymentStatus: "paid",
    });

    return updatedCustomer;
  }

  /**
   * Tính tổng số tiền cần thu
   */
  static calculateTotalAmountDue(customers: Customer[]): number {
    return customers
      .filter((customer) => customer.paymentStatus === "unpaid")
      .reduce((total, customer) => {
        return total + customer.amount * 10000;
      }, 0);
  }

  /**
   * Tính tổng số tiền đã thu
   */
  static calculateTotalAmountCollected(customers: Customer[]): number {
    return customers
      .filter((customer) => customer.paymentStatus === "paid")
      .reduce((total, customer) => {
        return total + customer.amount * 10000;
      }, 0);
  }

  /**
   * Phân tích thống kê thanh toán
   */
  static generatePaymentStatistics(customers: Customer[]): {
    totalCustomers: number;
    paidCustomers: number;
    unpaidCustomers: number;
    totalAmountDue: number;
    totalAmountCollected: number;
    paymentRate: number;
  } {
    const totalCustomers = customers.length;
    const paidCustomers = customers.filter(
      (customer) => customer.paymentStatus === "paid"
    ).length;
    const unpaidCustomers = totalCustomers - paidCustomers;
    const totalAmountDue = this.calculateTotalAmountDue(customers);
    const totalAmountCollected = this.calculateTotalAmountCollected(customers);
    const paymentRate =
      totalCustomers > 0 ? (paidCustomers / totalCustomers) * 100 : 0;

    return {
      totalCustomers,
      paidCustomers,
      unpaidCustomers,
      totalAmountDue,
      totalAmountCollected,
      paymentRate,
    };
  }

  /**
   * Tạo báo cáo thanh toán theo ngày
   */
  static async generateDailyPaymentReport(date: string): Promise<{
    statistics: ReturnType<typeof PaymentService.generatePaymentStatistics>;
    unpaidCustomers: Customer[];
  }> {
    // Lấy khách hàng theo ngày
    const customers = await CustomerAPI.getDeliveredCustomers(date);
    const statistics = this.generatePaymentStatistics(customers);
    const unpaidCustomers = customers.filter(
      (customer) => customer.paymentStatus === "unpaid"
    );

    return {
      statistics,
      unpaidCustomers,
    };
  }
}
