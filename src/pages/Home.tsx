import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { Link } from "react-router-dom";
import { JSX, useState } from "react";
import {
  FaCube,
  FaIceCream,
  FaMoneyBillWave,
  FaTruckFast,
  FaPeopleCarryBox,
  FaTrash,
} from "react-icons/fa6";
import {
  FaUserCircle,
  FaPlusCircle,
  FaEdit,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineUpdate } from "react-icons/md";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";

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

// Dữ liệu doanh thu theo tuần (7 ngày)
const weeklyRevenueChart = [
  { thu: "T2", doanhThu: 2_800_000 },
  { thu: "T3", doanhThu: 3_200_000 },
  { thu: "T4", doanhThu: 2_900_000 },
  { thu: "T5", doanhThu: 3_500_000 },
  { thu: "T6", doanhThu: 4_200_000 },
  { thu: "T7", doanhThu: 3_800_000 },
  { thu: "CN", doanhThu: 2_400_000 },
];

// Thống kê tuần này
const weeklyStats = {
  totalRevenue: 22_800_000, // Tổng doanh thu tuần này
  growthRate: 12.5, // Tăng trưởng 12.5% so với tuần trước
  totalDaCay: 1_850, // Tổng số đá cây giao tuần này
  totalDaBi: 920, // Tổng số đá bi giao tuần này
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function Home() {
  // State ngày chọn
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  // State chọn record
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const ordersPerPage = 4;

  // Lọc đơn theo ngày chọn
  const selectedDateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : "";
  const ordersToday = allOrders.filter((o) => o.date === selectedDateStr);

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(ordersToday.length / ordersPerPage));
  const pagedOrders = ordersToday.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Khi đổi ngày, reset về page 1
  function handleDateChange(date: Date | undefined) {
    setSelectedDate(date);
    setCurrentPage(1);
  }

  // Xử lý sửa/xóa record
  function handleEdit(id: number) {
    console.log("Edit record:", id);
    // Implement edit logic here
  }

  function handleDelete(id: number) {
    console.log("Delete record:", id);
    // Implement delete logic here
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-50">
      <TopNav />
      <motion.main
        className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Thêm thông tin giao đá */}
        <motion.section className="mb-4" variants={itemVariants}>
          <Link
            to="/add"
            className="block w-full bg-gradient-to-r from-pink-500 via-pink-400 to-emerald-400 text-white font-bold rounded-2xl shadow-lg px-4 py-3 text-center text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaPlusCircle className="text-xl drop-shadow-sm" />
            </motion.div>
            <span className="drop-shadow-sm">Thêm thông tin giao đá</span>
          </Link>
        </motion.section>

        {/* Thống kê trong ngày */}
        <motion.section
          className="mb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <motion.div variants={cardVariants}>
              <StatCard
                icon={
                  <FaIceCream className="text-white text-xl drop-shadow-sm" />
                }
                title="Đá cây"
                value={`${summary.daCay} cây`}
                gradient="from-pink-500 via-pink-400 to-rose-500"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <StatCard
                icon={<FaCube className="text-white text-xl drop-shadow-sm" />}
                title="Đá bi"
                value={`${summary.daBi} bịch`}
                gradient="from-blue-500 via-sky-400 to-cyan-500"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <StatCard
                icon={
                  <FaMoneyBillWave className="text-white text-xl drop-shadow-sm" />
                }
                title="Doanh thu"
                value={summary.doanhThu.toLocaleString("vi-VN")}
                gradient="from-emerald-500 via-green-400 to-teal-500"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Đơn giao đá theo ngày */}
        <motion.section
          className="mb-4"
          variants={slideInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
              Đơn giao đá theo ngày
            </h2>
            <DatePickerShadcn date={selectedDate} onChange={handleDateChange} />
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-2 max-h-72 overflow-y-auto">
            {pagedOrders.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-6">
                Không có đơn giao nào trong ngày này.
              </div>
            )}
            <div className="space-y-1.5">
              {pagedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={cn(
                    "p-2.5 rounded-lg border transition-all cursor-pointer",
                    selectedRecord === order.id
                      ? "bg-gradient-to-r from-pink-50 to-orange-50 border-pink-300"
                      : "bg-white/60 border-gray-200 hover:bg-white/80"
                  )}
                  onClick={() =>
                    setSelectedRecord(
                      selectedRecord === order.id ? null : order.id
                    )
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <TbTruckDelivery className="text-pink-500 text-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {order.customer}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <FaUserCircle className="text-pink-400 text-xs" />
                          <span>{order.shipper}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Thông tin ngắn gọn */}
                      <div className="text-xs text-right text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaIceCream className="text-pink-400" />
                          <span>{order.daCay}</span>
                          <FaCube className="text-sky-400 ml-1" />
                          <span>{order.daBi}</span>
                        </div>
                        <div className="font-medium text-green-600">
                          {order.revenue.toLocaleString("vi-VN")} ₫
                        </div>
                      </div>
                      {/* Nút action */}
                      <div className="flex gap-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6 text-blue-500 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(order.id);
                            }}
                          >
                            <FaEdit className="text-xs" />
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6 text-red-500 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(order.id);
                            }}
                          >
                            <FaTrash className="text-xs" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      aria-disabled={currentPage === 1}
                      className={cn(
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        isActive={currentPage === idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      aria-disabled={currentPage === totalPages}
                      className={cn(
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </motion.section>

        {/* Biểu đồ doanh thu theo tuần */}
        <motion.section
          className="mb-4"
          variants={slideInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Biểu đồ doanh thu theo tuần
          </h2>
          <motion.div
            className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <WeeklyRevenueAreaChart data={weeklyRevenueChart} />
          </motion.div>
        </motion.section>

        {/* Thống kê tuần này */}
        <motion.section
          className="mb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Thống kê tuần này
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Tổng doanh thu tuần này */}
            <motion.div
              className="bg-gradient-to-br from-emerald-500 via-green-400 to-teal-500 text-white rounded-xl shadow p-3"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <FaMoneyBillWave className="text-lg drop-shadow-sm" />
                    <span className="text-xs drop-shadow-sm">
                      Doanh thu tuần
                    </span>
                  </div>
                  <div className="text-base font-bold drop-shadow-sm">
                    {weeklyStats.totalRevenue.toLocaleString("vi-VN")} ₫
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {weeklyStats.growthRate > 0 ? (
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FaArrowUp className="text-green-200 drop-shadow-sm" />
                    </motion.div>
                  ) : (
                    <FaArrowDown className="text-red-200 drop-shadow-sm" />
                  )}
                  <span className="drop-shadow-sm">
                    +{weeklyStats.growthRate}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tăng trưởng */}
            <motion.div
              className="bg-gradient-to-br from-violet-500 via-purple-400 to-indigo-500 text-white rounded-xl shadow p-3"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-1 mb-1">
                {weeklyStats.growthRate > 0 ? (
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FaArrowUp className="text-lg drop-shadow-sm" />
                  </motion.div>
                ) : (
                  <FaArrowDown className="text-lg drop-shadow-sm" />
                )}
                <span className="text-xs drop-shadow-sm">Tăng trưởng</span>
              </div>
              <div className="text-base font-bold drop-shadow-sm">
                {weeklyStats.growthRate > 0 ? "+" : ""}
                {weeklyStats.growthRate}%
              </div>
              <div className="text-xs opacity-90 drop-shadow-sm">
                so với tuần trước
              </div>
            </motion.div>

            {/* Tổng đá cây tuần này */}
            <motion.div
              className="bg-gradient-to-br from-pink-500 via-rose-400 to-pink-600 text-white rounded-xl shadow p-3"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-1 mb-1">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                >
                  <FaIceCream className="text-lg drop-shadow-sm" />
                </motion.div>
                <span className="text-xs drop-shadow-sm">Đá cây tuần</span>
              </div>
              <div className="text-base font-bold drop-shadow-sm">
                {weeklyStats.totalDaCay.toLocaleString("vi-VN")} cây
              </div>
            </motion.div>

            {/* Tổng đá bi tuần này */}
            <motion.div
              className="bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-500 text-white rounded-xl shadow p-3"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-1 mb-1">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaCube className="text-lg drop-shadow-sm" />
                </motion.div>
                <span className="text-xs drop-shadow-sm">Đá bi tuần</span>
              </div>
              <div className="text-base font-bold drop-shadow-sm">
                {weeklyStats.totalDaBi.toLocaleString("vi-VN")} bịch
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Quick actions */}
        <motion.section
          className="mt-8 mb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Đang giao",
                icon: <FaTruckFast className="text-xl text-pink-500" />,
              },
              {
                label: "Chờ bốc",
                icon: <FaPeopleCarryBox className="text-xl text-pink-500" />,
              },
              {
                label: "Cập nhật",
                icon: <MdOutlineUpdate className="text-xl text-pink-500" />,
              },
              {
                label: "Lịch sử",
                icon: <TbTruckDelivery className="text-xl text-pink-500" />,
              },
            ].map((x, index) => (
              <motion.div
                key={x.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="#"
                  className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-md border border-white/40 rounded-xl shadow p-2 gap-1 hover:shadow-lg transition-shadow duration-300"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: index * 0.5,
                    }}
                  >
                    {x.icon}
                  </motion.div>
                  <span className="text-[11px] sm:text-xs text-gray-700">
                    {x.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.main>
      <BottomNav />
    </div>
  );
}

// Thẻ thống kê nhỏ với drop shadow cho text trên nền gradient
function StatCard({
  icon,
  title,
  value,
  gradient,
}: {
  icon: JSX.Element;
  title: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradient} text-white rounded-xl shadow flex flex-col items-center justify-center py-2 cursor-pointer`}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
        {icon}
      </motion.div>
      <span className="text-[11px] sm:text-xs mt-0.5 drop-shadow-sm">
        {title}
      </span>
      <motion.span
        className="text-sm sm:text-base font-semibold drop-shadow-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

// Biểu đồ area theo tuần – dùng AreaChart thay vì BarChart
function WeeklyRevenueAreaChart({
  data,
}: {
  data: Array<{ thu: string; doanhThu: number }>;
}) {
  return (
    <motion.div
      className="w-full h-40 sm:h-52"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="thu"
            tick={{ fontSize: 10 }}
            stroke="#9ca3af"
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <Tooltip
            formatter={(val: number) => `${val.toLocaleString("vi-VN")} ₫`}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="doanhThu"
            stroke="#ec4899"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// DatePicker sử dụng shadcn UI (Popover + Calendar)
function DatePickerShadcn({
  date,
  onChange,
}: {
  date: Date | undefined;
  onChange: (d: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className={cn(
              "w-[130px] justify-start text-left font-normal text-xs px-2 py-1 border rounded-lg transition-all duration-200",
              !date && "text-muted-foreground"
            )}
          >
            <span>
              {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
            </span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </motion.div>
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            initialFocus
            locale={vi}
          />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
