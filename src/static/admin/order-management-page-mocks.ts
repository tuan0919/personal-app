export interface Order {
  address: string;
  payStatus: "CHƯA THANH TOÁN" | "ĐÃ THANH TOÁN";
  orderType: "ĐÁ BI" | "ĐÁ CÂY";
  price: number;
  amount: number;
  shipper: Shipper;
  customer: Customer;
  deliveredTime: string;
  date: string;
}

interface Shipper {
  id: number;
  name: string;
}

interface Customer {
  id: number;
  name: string;
  price1: number;
  price2: number;
}

export const mockOrders: Order[] = [
  {
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    payStatus: "CHƯA THANH TOÁN",
    orderType: "ĐÁ BI",
    price: 12000,
    amount: 12000,
    shipper: {
      id: 1,
      name: "Nguyễn Văn A",
    },
    customer: {
      id: 1,
      name: "Nguyễn Văn A",
      price1: 12000,
      price2: 25000,
    },
    deliveredTime: "2025-08-10",
    date: "2025-08-10",
  },
  {
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    payStatus: "CHƯA THANH TOÁN",
    orderType: "ĐÁ BI",
    price: 12000,
    amount: 12000,
    shipper: {
      id: 1,
      name: "Nguyễn Văn A",
    },
    customer: {
      id: 1,
      name: "Nguyễn Văn A",
      price1: 12000,
      price2: 25000,
    },
    deliveredTime: "2025-08-10",
    date: "2025-08-10",
  },
  {
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    payStatus: "CHƯA THANH TOÁN",
    orderType: "ĐÁ BI",
    price: 12000,
    amount: 12000,
    shipper: {
      id: 1,
      name: "Nguyễn Văn A",
    },
    customer: {
      id: 1,
      name: "Nguyễn Văn A",
      price1: 12000,
      price2: 25000,
    },
    deliveredTime: "2025-08-10",
    date: "2025-08-10",
  },
];
