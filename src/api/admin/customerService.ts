import { mockCustomers } from "@/static/admin/customer-management-page-mocks";
import { CustomerEditFormValues } from "@/types/admin/customer-edit-page-types";
import { Customer } from "@/types/admin/customer-management-page-types";
import { delay } from "@/utils/delay";

export class CustomerService {
  static async getAllCustomers(): Promise<Customer[]> {
    await delay(1000);
    return [...mockCustomers];
  }
  static async getCustomerById(id: number): Promise<Customer | null> {
    await delay(1000);
    const customer = mockCustomers.find((c) => c.customerId === id);
    return customer ? { ...customer } : null;
  }

  static async updateCustomer(
    id: number,
    data: CustomerEditFormValues
  ): Promise<boolean> {
    await delay(1000);
    // In a real app, this would make an API call to update the customer
    // For now, we'll just simulate the update operation
    const customerIndex = mockCustomers.findIndex((c) => c.customerId === id);
    if (customerIndex === -1) return false;

    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      customerName: data.customerName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      price1: data.price1,
      price2: data.price2,
      avatar: data.avatar || mockCustomers[customerIndex].avatar,
    };

    return true;
  }
}
