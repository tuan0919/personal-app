import { mockCustomers } from "@/static/admin/customer-management-page-mocks";
import { Customer } from "@/types/admin/customer-management-page-types";
import { delay } from "@/utils/delay";

export class CustomerService {
  static async getAllCustomers(): Promise<Customer[]> {
    await delay(1000);
    return [...mockCustomers];
  }
}
