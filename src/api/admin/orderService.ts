import { mockOrders } from "@/static/admin/order-management-page-mocks";
import { Order } from "@/types/admin/order-management-page-types";
import { delay } from "@/utils/delay";

export class OrderService {
  static async getAllOrders(): Promise<Order[]> {
    await delay(800);
    return [...mockOrders];
  }
}
