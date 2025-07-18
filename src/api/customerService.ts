import { Customer, FilterValues } from './types';

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

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class CustomerService {
  static async getAllCustomers(): Promise<Customer[]> {
    await delay(500); // Simulate network delay
    return [...mockCustomers];
  }

  static async getDeliveredCustomers(): Promise<Customer[]> {
    await delay(300);
    return mockCustomers.filter(customer => customer.delivered);
  }

  static async getFilteredCustomers(filters: FilterValues): Promise<Customer[]> {
    await delay(400);
    
    return mockCustomers.filter(customer => {
      if (filters.paymentStatus && customer.paymentStatus !== filters.paymentStatus) {
        return false;
      }
      if (filters.productType && customer.productType !== filters.productType) {
        return false;
      }
      if (filters.delivered !== undefined && customer.delivered !== filters.delivered) {
        return false;
      }
      return true;
    });
  }

  static async updateCustomer(customerId: number, updates: Partial<Customer>): Promise<Customer> {
    await delay(300);
    
    const customerIndex = mockCustomers.findIndex(c => c.customerId === customerId);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    
    mockCustomers[customerIndex] = { ...mockCustomers[customerIndex], ...updates };
    return mockCustomers[customerIndex];
  }

  static async deleteCustomer(customerId: number): Promise<void> {
    await delay(300);
    
    const customerIndex = mockCustomers.findIndex(c => c.customerId === customerId);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    
    mockCustomers.splice(customerIndex, 1);
  }
}
