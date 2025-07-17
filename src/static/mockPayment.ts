interface Product {
  type: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  address: string;
  phone: string;
  deliveryDate: string; // yyyy-mm-dd
  deliveryTime: string; // HH:mm
  products: Product[];
  totalAmount: number;
  isPaid: boolean;
  notes: string;
}

const mockOrders = [
  {
    id: 1,
    customerName: "Nguyễn Văn An",
    address: "123 Đường ABC, Quận 1",
    phone: "0901234567",
    deliveryDate: "2025-07-10",
    deliveryTime: "14:30",
    products: [
      { type: "Đá cây", quantity: 2, price: 10000 },
      { type: "Đá viên", quantity: 1, price: 15000 },
    ],
    totalAmount: 35000,
    isPaid: false,
    notes: "Giao tại cổng chính",
  },
  {
    id: 2,
    customerName: "Trần Thị Bình",
    address: "456 Đường DEF, Quận 3",
    phone: "0912345678",
    deliveryDate: "2025-07-09",
    deliveryTime: "10:15",
    products: [{ type: "Đá viên", quantity: 3, price: 15000 }],
    totalAmount: 45000,
    isPaid: true,
    notes: "",
  },
  {
    id: 3,
    customerName: "Lê Văn Cường",
    address: "789 Đường GHI, Quận 7",
    phone: "0923456789",
    deliveryDate: "2025-07-11",
    deliveryTime: "16:45",
    products: [{ type: "Đá cây", quantity: 5, price: 10000 }],
    totalAmount: 50000,
    isPaid: false,
    notes: "Khách yêu cầu gọi trước 15 phút",
  },
  {
    id: 4,
    customerName: "Phạm Thị Dung",
    address: "321 Đường JKL, Quận 5",
    phone: "0934567890",
    deliveryDate: "2025-07-08",
    deliveryTime: "09:30",
    products: [
      { type: "Đá cây", quantity: 1, price: 10000 },
      { type: "Đá viên", quantity: 2, price: 15000 },
    ],
    totalAmount: 40000,
    isPaid: false,
    notes: "",
  },
  {
    id: 5,
    customerName: "Hoàng Văn Em",
    address: "654 Đường MNO, Quận 2",
    phone: "0945678901",
    deliveryDate: "2025-07-12",
    deliveryTime: "11:20",
    products: [{ type: "Đá viên", quantity: 4, price: 15000 }],
    totalAmount: 60000,
    isPaid: false,
    notes: "Giao tại tầng 3",
  },
  {
    id: 6,
    customerName: "Vũ Thị Phượng",
    address: "987 Đường PQR, Quận 4",
    phone: "0956789012",
    deliveryDate: "2025-07-07",
    deliveryTime: "13:45",
    products: [{ type: "Đá cây", quantity: 3, price: 10000 }],
    totalAmount: 30000,
    isPaid: true,
    notes: "",
  },
];

export { mockOrders };

export type { Order, Product };
