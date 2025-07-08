const customer = {
  id: 1,
  name: "Nguyễn Văn A",
  username: "nguyenvana",
  phone: "0901 234 567",
  address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  avatar: "",
  location: { lat: 10.7769, lng: 106.7009 },
  price: { daCay: 35, daBi: 18 },
};

const weeklyRevenueData = [
  { week: "T2", daCay: 800000, daBi: 300000, total: 1100000 },
  { week: "T3", daCay: 1200000, daBi: 360000, total: 1560000 },
  { week: "T4", daCay: 950000, daBi: 420000, total: 1370000 },
  { week: "T5", daCay: 1500000, daBi: 500000, total: 2000000 },
  { week: "T6", daCay: 1100000, daBi: 450000, total: 1550000 },
  { week: "T7", daCay: 1300000, daBi: 380000, total: 1680000 },
  { week: "CN", daCay: 1200000, daBi: 360000, total: 1560000 },
];

const deliveryHistory = [
  {
    date: "2025-07-08",
    daCay: 30,
    daBi: 10,
    revenue: 1300000,
    shipper: "Trần Văn B",
  },
  {
    date: "2025-07-05",
    daCay: 15,
    daBi: 20,
    revenue: 1100000,
    shipper: "Nguyễn Văn C",
  },
  {
    date: "2025-07-03",
    daCay: 40,
    daBi: 0,
    revenue: 1400000,
    shipper: "Lê Thị D",
  },
  {
    date: "2025-07-01",
    daCay: 10,
    daBi: 12,
    revenue: 660000,
    shipper: "Trần Văn B",
  },
];

const deliveredDates = ["2025-07-01", "2025-07-03", "2025-07-05", "2025-07-08"];

export { customer, weeklyRevenueData, deliveryHistory, deliveredDates };
