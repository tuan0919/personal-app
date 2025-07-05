// Dữ liệu giả lập
const summary = {
  daCay: 320, // cây
  daBi: 180, // bịch
  doanhThu: 3_200_000, // VND
};

const allOrders = [
  {
    id: 1,
    customer: "Quán Cà Phê Hương Việt",
    daCay: 40,
    daBi: 10,
    revenue: 420_000,
    shipper: "Nguyễn Văn A",
    date: "2025-07-06",
  },
  {
    id: 2,
    customer: "Nhà Hàng Sen Tây Hồ",
    daCay: 60,
    daBi: 25,
    revenue: 650_000,
    shipper: "Trần Thị B",
    date: "2025-07-06",
  },
  {
    id: 3,
    customer: "Beer Club 1990",
    daCay: 50,
    daBi: 40,
    revenue: 700_000,
    shipper: "Phạm Văn C",
    date: "2025-07-06",
  },
  // Thêm nhiều đơn để test phân trang
  {
    id: 4,
    customer: "Cafe Sáng",
    daCay: 30,
    daBi: 5,
    revenue: 200_000,
    shipper: "Nguyễn Văn D",
    date: "2025-07-06",
  },
  {
    id: 5,
    customer: "Nhà Hàng Hoa Sữa",
    daCay: 40,
    daBi: 8,
    revenue: 350_000,
    shipper: "Lê Thị E",
    date: "2025-07-06",
  },
  {
    id: 6,
    customer: "Quán Nhậu Đêm",
    daCay: 20,
    daBi: 15,
    revenue: 210_000,
    shipper: "Trần Văn F",
    date: "2025-07-06",
  },
  // Đơn của ngày khác để test lọc
  {
    id: 7,
    customer: "Test Ngày Khác",
    daCay: 10,
    daBi: 2,
    revenue: 50_000,
    shipper: "Nguyễn Văn G",
    date: "2025-07-05",
  },
];

// Dữ liệu doanh thu theo giờ
const revenueChart = [
  { giờ: "08h", doanhThu: 300_000 },
  { giờ: "10h", doanhThu: 450_000 },
  { giờ: "12h", doanhThu: 650_000 },
  { giờ: "14h", doanhThu: 550_000 },
  { giờ: "16h", doanhThu: 350_000 },
  { giờ: "18h", doanhThu: 900_000 },
];

export { summary, allOrders, revenueChart };
