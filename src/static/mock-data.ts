const summary = { daCay: 320, daBi: 180, doanhThu: 3_200_000 };
const allOrders = [
  {
    id: 1,
    customer: "Quán Cà Phê Hương Việt",
    daCay: 40,
    daBi: 10,
    revenue: 420_000,
    shipper: "Nguyễn Văn A",
    date: "2025-07-08",
  },
  {
    id: 2,
    customer: "Nhà Hàng Sen Tây Hồ",
    daCay: 60,
    daBi: 25,
    revenue: 650_000,
    shipper: "Trần Thị B",
    date: "2025-07-08",
  },
  {
    id: 3,
    customer: "Beer Club 1990",
    daCay: 50,
    daBi: 40,
    revenue: 700_000,
    shipper: "Phạm Văn C",
    date: "2025-07-08",
  },
  {
    id: 4,
    customer: "Cafe Sáng",
    daCay: 30,
    daBi: 5,
    revenue: 200_000,
    shipper: "Nguyễn Văn D",
    date: "2025-07-08",
  },
  {
    id: 5,
    customer: "Nhà Hàng Hoa Sữa",
    daCay: 40,
    daBi: 8,
    revenue: 350_000,
    shipper: "Lê Thị E",
    date: "2025-07-08",
  },
  {
    id: 6,
    customer: "Quán Nhậu Đêm",
    daCay: 20,
    daBi: 15,
    revenue: 210_000,
    shipper: "Trần Văn F",
    date: "2025-07-08",
  },
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
const weeklyRevenueChart = [
  { thu: "T2", doanhThu: 2_800_000 },
  { thu: "T3", doanhThu: 3_200_000 },
  { thu: "T4", doanhThu: 2_900_000 },
  { thu: "T5", doanhThu: 3_500_000 },
  { thu: "T6", doanhThu: 4_200_000 },
  { thu: "T7", doanhThu: 3_800_000 },
  { thu: "CN", doanhThu: 2_400_000 },
];
const weeklyStats = {
  totalRevenue: 22_800_000,
  growthRate: 12.5,
  totalDaCay: 1_850,
  totalDaBi: 920,
};

export { summary, allOrders, weeklyRevenueChart, weeklyStats };
