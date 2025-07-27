interface Product {
  type: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  address: string;
  phone: string;
  deliveryDate: string; // yyyy-mm-dd
  deliveryTime: string; // HH:mm
  products: Product[];
  totalAmount: number;
  isPaid: boolean;
  paymentCollectedDate?: string; // yyyy-mm-dd - ngày thu tiền (chỉ có khi isPaid = true)
  notes: string;
}

const mockOrders: Order[] = [
  // Ngày 2025-07-10
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
    paymentCollectedDate: "2025-07-27",
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
    paymentCollectedDate: "2025-07-26",
    notes: "",
  },
  // Thêm đơn hàng cho ngày 2025-07-19 (hôm nay)
  {
    id: 7,
    customerName: "Đặng Minh Tâm",
    address: "111 Đường Hai Bà Trưng, Quận 1",
    phone: "0967890123",
    deliveryDate: "2025-07-19",
    deliveryTime: "08:00",
    products: [
      { type: "Đá cây", quantity: 10, price: 10000 },
      { type: "Đá viên", quantity: 5, price: 15000 },
    ],
    totalAmount: 175000,
    isPaid: false,
    notes: "Giao sớm",
  },
  {
    id: 8,
    customerName: "Ngô Văn Hiếu",
    address: "222 Đường Võ Văn Tần, Quận 3",
    phone: "0978901234",
    deliveryDate: "2025-07-19",
    deliveryTime: "09:15",
    products: [{ type: "Đá cây", quantity: 8, price: 10000 }],
    totalAmount: 80000,
    isPaid: true,
    paymentCollectedDate: "2025-07-27",
    notes: "",
  },
  {
    id: 9,
    customerName: "Bùi Thị Lan",
    address: "333 Đường Điện Biên Phủ, Quận Bình Thạnh",
    phone: "0989012345",
    deliveryDate: "2025-07-19",
    deliveryTime: "14:00",
    products: [{ type: "Đá viên", quantity: 12, price: 15000 }],
    totalAmount: 180000,
    isPaid: false,
    notes: "",
  },
  // Thêm đơn hàng cho ngày 2025-07-20 (ngày mai)
  {
    id: 10,
    customerName: "Lý Hoài Nam",
    address: "444 Đường Phan Xích Long, Quận Phú Nhuận",
    phone: "0990123456",
    deliveryDate: "2025-07-20",
    deliveryTime: "10:30",
    products: [
      { type: "Đá cây", quantity: 15, price: 10000 },
      { type: "Đá bi", quantity: 10, price: 12000 },
    ],
    totalAmount: 270000,
    isPaid: false,
    notes: "Khách VIP, giao đúng giờ",
  },
  {
    id: 11,
    customerName: "Trần Quốc Bảo",
    address: "555 Đường D2, Quận Bình Thạnh",
    phone: "0901234567",
    deliveryDate: "2025-07-20",
    deliveryTime: "13:45",
    products: [{ type: "Đá cây", quantity: 20, price: 10000 }],
    totalAmount: 200000,
    isPaid: false,
    notes: "",
  },
  // Thêm đơn hàng cho ngày 2025-07-18 (hôm qua)
  {
    id: 12,
    customerName: "Phan Thị Mai",
    address: "666 Đường Nguyễn Đình Chiểu, Quận 3",
    phone: "0912345678",
    deliveryDate: "2025-07-18",
    deliveryTime: "09:00",
    products: [
      { type: "Đá viên", quantity: 8, price: 15000 },
      { type: "Đá bi", quantity: 5, price: 12000 },
    ],
    totalAmount: 180000,
    isPaid: true,
    paymentCollectedDate: "2025-07-27",
    notes: "",
  },
  {
    id: 13,
    customerName: "Hoàng Minh Trí",
    address: "777 Đường Lê Văn Sỹ, Quận Tân Bình",
    phone: "0923456789",
    deliveryDate: "2025-07-18",
    deliveryTime: "16:30",
    products: [{ type: "Đá cây", quantity: 25, price: 10000 }],
    totalAmount: 250000,
    isPaid: false,
    notes: "Giao sau 16:00",
  },
];

// Hàm lấy đơn hàng theo ngày
export const getOrdersByDate = (date: string): Order[] => {
  return mockOrders.filter((order) => order.deliveryDate === date);
};

// Hàm mô phỏng API để lấy tất cả đơn hàng với độ trễ
export const getAllOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockOrders]);
    }, 1000);
  });
};

// Hàm mô phỏng API để lấy đơn hàng theo ngày với độ trễ
export const fetchOrdersByDate = (date: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredOrders = getOrdersByDate(date);
      resolve(filteredOrders);
    }, 800);
  });
};

export { mockOrders };

export type { Product };
