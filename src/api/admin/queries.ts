import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "./customer.service";

export function useCustomers() {
    return useQuery({
        queryKey: ['getAllCustomers'],
        queryFn: () => CustomerService.getAllCustomers(),
        staleTime: 30_000,
    });
}

export function useCustomer(id: number) {
    return useQuery({
        queryKey: ['getCustomerById', id],
        queryFn: () => CustomerService.getCustomerById(id),
        staleTime: 30_000,
    });
}