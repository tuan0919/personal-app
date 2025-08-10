export interface Customer {
  customerId: number;
  customerName: string;
  address: string;
  phoneNumber: string;
  price1: number;
  price2: number;
  avatar?: string;
}

export const mockCustomers: Customer[] = [
  {
    customerId: 1,
    customerName: "Nguyễn Văn A",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phoneNumber: "0901234567",
    price1: 12000,
    price2: 25000,
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    customerId: 2,
    customerName: "Trần Thị B",
    address: "45 Trần Phú, Quận 5, TP.HCM",
    phoneNumber: "0912345678",
    price1: 10000,
    price2: 20000,
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    customerId: 3,
    customerName: "Lê Văn C",
    address: "78 Lê Lợi, Quận 1, TP.HCM",
    phoneNumber: "0987654321",
    price1: 15000,
    price2: 30000,
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    customerId: 4,
    customerName: "Phạm Thị D",
    address: "200 Điện Biên Phủ, Quận 3, TP.HCM",
    phoneNumber: "0123456789",
    price1: 9000,
    price2: 18000,
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    customerId: 5,
    customerName: "Võ Văn E",
    address: "10 Võ Thị Sáu, Quận 3, TP.HCM",
    phoneNumber: "0999888777",
    price1: 11000,
    price2: 22000,
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    customerId: 6,
    customerName: "Đỗ Thị F",
    address: "50 Đinh Tiên Hoàng, Quận 1, TP.HCM",
    phoneNumber: "0977123456",
    price1: 13000,
    price2: 27000,
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    customerId: 7,
    customerName: "Hoàng Văn G",
    address: "80 Phan Đình Phùng, Quận Phú Nhuận, TP.HCM",
    phoneNumber: "0932123456",
    price1: 14000,
    price2: 26000,
    avatar: "https://i.pravatar.cc/150?u=7",
  },
  {
    customerId: 8,
    customerName: "Ngô Thị H",
    address: "150 Lê Văn Sỹ, Quận 3, TP.HCM",
    phoneNumber: "0909123456",
    price1: 12000,
    price2: 24000,
    avatar: "https://i.pravatar.cc/150?u=8",
  },
];
