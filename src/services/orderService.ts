import { Customer } from "@/api/types";
import { CustomerService as CustomerAPI } from "@/api/customerService";

/**
 * Service class để xử lý logic business liên quan đến Order
 */
export class OrderService {
  /**
   * Lấy tất cả đơn hàng (sử dụng Customer API vì hiện tại chưa có Order API riêng)
   */
  static async getAllOrders(): Promise<Customer[]> {
    const customers = await CustomerAPI.getAllCustomers();
    return customers;
  }

  /**
   * Lấy đơn hàng theo ngày
   */
  static async getOrdersByDate(date: string): Promise<Customer[]> {
    const customers = await CustomerAPI.getDeliveredCustomers(date);
    return customers;
  }

  /**
   * Tính tổng doanh thu từ danh sách đơn hàng
   */
  static calculateTotalRevenue(orders: Customer[]): number {
    return orders.reduce((total, order) => {
      return total + order.amount * 10000;
    }, 0);
  }

  /**
   * Tính số lượng đơn hàng đã thanh toán
   */
  static countPaidOrders(orders: Customer[]): number {
    return orders.filter((order) => order.paymentStatus === "paid").length;
  }

  /**
   * Tính số lượng đơn hàng chưa thanh toán
   */
  static countUnpaidOrders(orders: Customer[]): number {
    return orders.filter((order) => order.paymentStatus === "unpaid").length;
  }

  /**
   * Phân tích doanh thu theo loại sản phẩm
   */
  static analyzeRevenueByProductType(
    orders: Customer[]
  ): Record<string, number> {
    const result: Record<string, number> = {
      "1": 0, // Đá cây
      "2": 0, // Đá viên
    };

    orders.forEach((order) => {
      if (order.productType) {
        result[order.productType.toString()] += order.amount * 10000;
      }
    });

    return result;
  }

  /**
   * Tạo báo cáo doanh thu theo ngày
   */
  static generateDailyRevenueReport(
    orders: Customer[],
    date: string
  ): {
    totalRevenue: number;
    paidOrders: number;
    unpaidOrders: number;
    totalOrders: number;
    revenueByProductType: Record<string, number>;
  } {
    // Lọc đơn hàng theo ngày
    const ordersOnDate = orders.filter((order) => {
      // @ts-expect-error - Sử dụng trường deliveryDate
      return order.deliveryDate === date;
    });

    return {
      totalRevenue: this.calculateTotalRevenue(ordersOnDate),
      paidOrders: this.countPaidOrders(ordersOnDate),
      unpaidOrders: this.countUnpaidOrders(ordersOnDate),
      totalOrders: ordersOnDate.length,
      revenueByProductType: this.analyzeRevenueByProductType(ordersOnDate),
    };
  }
}
