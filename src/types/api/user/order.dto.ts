import { Customer } from "./customer.dto";
import { Employee } from "./employee.dto";

interface Order {
    customer: Customer;
    deliveryTime: string;
    delivered: boolean;
    productType: number;
    amount: number;
    paymentStatus: string;
    deliveryDateStr: string;
    shipper: Employee;
}

export type {
    Order,
}