// CustomerDetails.tsx

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaUserCircle,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
  FaMoneyBillWave,
  FaCube,
  FaIceCream,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaDollarSign,
  FaArrowLeft,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { cn } from "@/lib/utils";
import {
  format,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  formatDate,
} from "date-fns";
import { vi } from "date-fns/locale";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

// Mock data
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

const deliveredDates = ["2025-07-01", "2025-07-03", "2025-07-05", "2025-07-08"];

// Data cho area chart với nhiều tuần để tạo miền
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function useReplayAnim(ref: React.RefObject, deps: any[] = []) {
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, margin: "0px" });

  useEffect(() => {
    controls.set("hidden");
    controls.start(inView ? "visible" : "hidden");
    // eslint-disable-next-line
  }, [inView, ...deps]);

  return controls;
}

// Improved Mobile-Optimized Custom Calendar Component
interface CustomCalendarProps {
  deliveredDates: string[];
}

function CustomerDetailsNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg border-b border-white/30 shadow-md rounded-b-2xl px-4 py-3 flex items-center gap-3">
      <button
        type="button"
        aria-label="Quay lại"
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-pink-100 transition"
      >
        <FaArrowLeft className="text-pink-400 text-xl" />
      </button>
      <span className="text-lg font-bold text-gray-800 tracking-wide">
        Chi tiết khách hàng
      </span>
    </nav>
  );
}

function CustomCalendar({ deliveredDates }: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  // Lấy tất cả các ngày trong tháng
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Thêm các ngày từ tháng trước để fill tuần đầu
  const startDate = new Date(monthStart);
  const startDay = getDay(monthStart);
  startDate.setDate(startDate.getDate() - startDay);

  // Thêm các ngày từ tháng sau để fill tuần cuối
  const endDate = new Date(monthEnd);
  const endDay = getDay(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - endDay));

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const isDelivered = (date: Date) => {
    return deliveredDates.includes(format(date, "yyyy-MM-dd"));
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="w-full">
      {/* Simplified Calendar Container */}
      <div className="bg-white/80 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6">
        {/* Simplified Header - Bỏ gradient kỳ quặc */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 p-2 sm:p-4 bg-gray-300/70 border border-gray-500 rounded-xl sm:rounded-2xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousMonth}
            className="rounded-full hover:bg-white/20 text-gray-600 border-0 h-8 w-8 sm:h-10 sm:w-10 p-0"
          >
            <FaChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <h3 className="font-bold text-gray-600 text-sm sm:text-lg">
            {format(currentDate, "MMMM yyyy", { locale: vi })}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            className="rounded-full hover:bg-white/20 text-gray-600 border-0 h-8 w-8 sm:h-10 sm:w-10 p-0"
          >
            <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Days of week header - Improved spacing */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-2 sm:mb-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs sm:text-sm font-bold text-gray-800 py-1 sm:py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Improved Calendar Grid - Smaller size + More gap */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {allDays.map((date, index) => {
            const isCurrentMonthDate = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            const isDeliveredDate = isDelivered(date);
            const isPastDate = date < today && !isTodayDate;

            return (
              <div
                key={index}
                className={cn(
                  // Smaller responsive sizing với more gap
                  "relative flex items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold",
                  // Mobile: 9vw (nhỏ hơn từ 11vw), min 40px height for touch
                  "w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]",
                  "max-w-14 max-h-14", // Maximum size constraint
                  "mx-auto",

                  // Base styles
                  !isCurrentMonthDate && "text-gray-300 opacity-50",

                  // Current month dates
                  isCurrentMonthDate &&
                    "text-gray-700 hover:bg-gray-50 cursor-pointer",

                  // Today highlight
                  isTodayDate &&
                    "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg transform scale-105 sm:scale-110 font-bold",

                  // Delivered dates
                  isDeliveredDate &&
                    !isTodayDate &&
                    "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md",

                  // Missed dates (past dates not delivered)
                  !isDeliveredDate &&
                    isPastDate &&
                    isCurrentMonthDate &&
                    !isTodayDate &&
                    "bg-gradient-to-br from-red-400 to-red-500 text-white shadow-md",

                  // Future dates
                  date > today &&
                    isCurrentMonthDate &&
                    "bg-gray-50 text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="z-10 leading-none">{date.getDate()}</span>

                {/* Responsive Status Icons */}
                {isDeliveredDate && isCurrentMonthDate && (
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-white rounded-full p-0.5 sm:p-1 shadow-md">
                    <FaCheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5 text-green-500" />
                  </div>
                )}

                {!isDeliveredDate &&
                  isPastDate &&
                  isCurrentMonthDate &&
                  !isTodayDate && (
                    <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-white rounded-full p-0.5 sm:p-1 shadow-md">
                      <FaTimes className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5 text-red-500" />
                    </div>
                  )}

                {/* Today indicator */}
                {isTodayDate && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Responsive Legend */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 border border-green-600 rounded-lg sm:rounded-xl">
            <div className="bg-green-500 rounded-full p-0.5 sm:p-1 flex-shrink-0">
              <FaCheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-green-700 font-semibold text-xs sm:text-sm">
              Đã giao
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 border border-red-600 rounded-lg sm:rounded-xl">
            <div className="bg-red-500 rounded-full p-0.5 sm:p-1 flex-shrink-0">
              <FaTimes className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-red-700 font-semibold text-xs sm:text-sm">
              Chưa giao
            </span>
          </div>
        </div>

        {/* Responsive Summary stats */}
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-pink-50 border border-gray-300 to-green-50 rounded-lg sm:rounded-xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {
                  deliveredDates.filter((date) => {
                    const d = new Date(date);
                    return (
                      d.getMonth() === currentDate.getMonth() &&
                      d.getFullYear() === currentDate.getFullYear()
                    );
                  }).length
                }
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                Đã giao tháng này
              </p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold text-pink-600">
                {
                  allDays.filter((date) => {
                    const isPast = date < today && !isToday(date);
                    const isCurrentMonthDate = isCurrentMonth(date);
                    const isDeliveredDate = isDelivered(date);
                    return isPast && isCurrentMonthDate && !isDeliveredDate;
                  }).length
                }
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                Bỏ lỡ tháng này
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomerDetails() {
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 3;

  // refs cho animation
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const calendarRef = useRef(null);
  const chartRef = useRef(null);
  const priceRef = useRef(null);
  const historyRef = useRef(null);

  const infoCtrl = useReplayAnim(infoRef);
  const mapCtrl = useReplayAnim(mapRef);
  const calendarCtrl = useReplayAnim(calendarRef);
  const chartCtrl = useReplayAnim(chartRef);
  const priceCtrl = useReplayAnim(priceRef);
  const historyCtrl = useReplayAnim(historyRef, [historyPage]);

  // Lấy lịch sử phân trang
  const totalHistoryPages = Math.ceil(deliveryHistory.length / historyPerPage);
  const pagedHistory = deliveryHistory.slice(
    (historyPage - 1) * historyPerPage,
    historyPage * historyPerPage
  );

  // Custom tooltip cho biểu đồ
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-pink-200 rounded-2xl p-4 shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString("vi-VN")} ₫
            </p>
          ))}
          <p className="text-sm font-semibold text-gray-700 mt-2 pt-2 border-t border-gray-200">
            Tổng:{" "}
            {payload
              .reduce((sum: number, entry: any) => sum + entry.value, 0)
              .toLocaleString("vi-VN")}{" "}
            ₫
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <CustomerDetailsNavBar />
      <motion.main
        className="flex-1 overflow-y-auto pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Thông tin khách hàng + Map */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 lg:grid-cols-2">
          <motion.div
            ref={infoRef}
            variants={fadeInUp}
            initial="hidden"
            animate={infoCtrl}
            className="space-y-4 rounded-2xl bg-white/50 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-1">
                <div className="bg-white rounded-full p-2">
                  <FaUserCircle className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {customer.name}
                </h2>
                <p className="text-pink-500 font-medium">
                  @{customer.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-600">
              <div className="bg-green-100 rounded-full p-2">
                <FaPhoneAlt className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                {customer.phone}
              </span>
            </div>

            <div className="flex items-start gap-3 bg-pink-50 rounded-xl p-3 border border-pink-600">
              <div className="bg-pink-100 rounded-full p-2 mt-1">
                <FaMapMarkerAlt className="h-4 w-4 text-pink-600" />
              </div>
              <span className="text-gray-700">{customer.address}</span>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            ref={mapRef}
            variants={fadeInLeft}
            initial="hidden"
            animate={mapCtrl}
            className="h-64 p-3 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg overflow-hidden border border-pink-100"
          >
            <MapContainer
              center={[customer.location.lat, customer.location.lng]}
              zoom={15}
              className="h-full w-full rounded-2xl overflow-hidden"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[customer.location.lat, customer.location.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.address}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 p-4 pb-24">
          {/* Improved Calendar */}
          <motion.div
            ref={calendarRef}
            variants={fadeInUp}
            initial="hidden"
            animate={calendarCtrl}
            className="rounded-2xl bg-white/50 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
                <FaCalendarAlt className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Lịch giao đá</h3>
            </div>

            <CustomCalendar deliveredDates={deliveredDates} />
          </motion.div>

          {/* Đơn giá đá - Thiết kế không đổi */}
          <motion.div
            ref={priceRef}
            variants={fadeInUp}
            initial="hidden"
            animate={priceCtrl}
            className="rounded-2xl bg-white/50 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
                <FaDollarSign className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Bảng giá sản phẩm
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Đá cây */}
              <div className="group relative overflow-hidden rounded-md bg-gradient-to-br from-pink-500/70 to-red-600/80 p-3 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow">
                      <FaIceCream className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="uppercase font-semibold text-2xl text-shadow">
                        Đá cây
                      </div>
                      <span className="text-shadow">
                        {customer.price.daCay} nghìn / cây
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Đá bi */}
              <div className="group relative overflow-hidden rounded-md bg-gradient-to-br from-green-500/70 to-green-700/80 p-3 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow">
                      <FaCube className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="uppercase font-semibold text-2xl text-shadow">
                        Đá bi
                      </div>
                      <span className="text-shadow">
                        {customer.price.daBi} nghìn / bịch
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biểu đồ doanh thu theo tuần - Area Chart */}
          <motion.div
            ref={chartRef}
            variants={fadeInUp}
            initial="hidden"
            animate={chartCtrl}
            className="rounded-2xl bg-white/70 backdrop-blur-sm py-6 px-3 shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
                <FaMoneyBillWave className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Biểu đồ doanh thu theo tuần
              </h3>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyRevenueData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorDaCay" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#ec4899"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient id="colorDaBi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="daCay"
                    stackId="1"
                    stroke="#ec4899"
                    strokeWidth={2}
                    fill="url(#colorDaCay)"
                    name="Đá cây"
                  />
                  <Area
                    type="monotone"
                    dataKey="daBi"
                    stackId="1"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#colorDaBi)"
                    name="Đá bi"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Lịch sử giao đá */}
          <motion.div
            ref={historyRef}
            variants={staggerChildren}
            initial="hidden"
            animate={historyCtrl}
            className="rounded-2xl bg-white/70 backdrop-blur-sm px-2 py-6 shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
                <FaHistory className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Lịch sử giao đá
              </h3>
            </div>
            <div className="space-y-4">
              {pagedHistory.map((h, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-center justify-between rounded-md p-2 border-gray-300 border"
                >
                  <div className="flex items-center gap-4">
                    <div className="border-gray-300 border-2 rounded-full p-2">
                      <FaTruck className="h-4 w-4 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-gray-800">
                        {formatDate(h.date, "dd/MM/yyyy")}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaUserCircle className="h-5 w-5 text-pink-500" />
                        <span className="font-medium">{h.shipper}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-600">
                      {h.revenue.toLocaleString("vi-VN") + "₫"}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <FaIceCream className="text-pink-400 text-xl drop-shadow-sm" />
                        <span className="font-medium text-pink-400">
                          {h.daBi}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCube className="text-blue-500 text-xl drop-shadow-sm" />
                        <span className="font-medium text-blue-500">
                          {h.daCay}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {totalHistoryPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setHistoryPage((p) => Math.max(1, p - 1))
                        }
                        className={cn(
                          "rounded-full",
                          historyPage === 1 && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalHistoryPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setHistoryPage(i + 1)}
                          isActive={historyPage === i + 1}
                          className="rounded-full"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setHistoryPage((p) =>
                            Math.min(totalHistoryPages, p + 1)
                          )
                        }
                        className={cn(
                          "rounded-full",
                          historyPage === totalHistoryPages &&
                            "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>
      <BottomNav />
    </div>
  );
}
