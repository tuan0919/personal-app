import { Customer } from "@/types/api";
import { delay } from "@/utils/delay";
import { CustomerMock } from "@/mocks/customer.mock";

export class CustomerService {
  
  static async getAllCustomers(): Promise<Customer[]> {
    await delay(1000);
    return [...CustomerMock];
  }

  static async getCustomerById(id: number): Promise<Customer | null> {
    await delay(1000);
    const customer = CustomerMock.find((c) => c.customerId === id);
    return customer ? { ...customer } : null;
  }

  static async updateCustomer(
    id: number,
    data: Partial<Customer>
  ): Promise<boolean> {
    await delay(1000);
    console.log(`we're update customerId: ${id} \n with this data: ${data}`);
    return true;
  }

  static async createCustomer(data: Customer): Promise<Customer> {
    await delay(1000);
    console.log(`we're create new customer: ${data}`);
    return data;
  }

  static async deleteCustomer(id: number): Promise<boolean> {
    await delay(500);
    console.log(`we're delete customerId: ${id}`);
    return true;
  }
}
