// /data/mockCustomers.ts
export type Customer = {
  customerId: number;
  customerName: string;
  delivered: boolean;
  address?: string;
  deliveryTime?: string;
};

export const allCustomers: Customer[] = Array.from({ length: 25 }).map(
  (_, i) => ({
    customerId: i + 1,
    customerName: `Khách hàng ${i + 1}`,
    delivered: i % 3 === 0,
    address: `${i + 1} Đường ABC`,
    deliveryTime: `${8 + (i % 8)}:${(i % 6) * 10}0`,
  })
);
