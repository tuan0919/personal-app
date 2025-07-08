import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect, RefObject } from "react";
import {
  FaCube,
  FaIceCream,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { motion, useAnimation, useInView } from "framer-motion";
import { StatCard } from "@/components/Home/StatCard";
import {
  allOrders,
  summary,
  weeklyRevenueChart,
  weeklyStats,
} from "@/static/mock-data";
import { CalendarChooser } from "@/components/Home/CalendarChooser";
import { WeeklyRevenueAreaChart } from "@/components/Home/WeeklyRevenueAreaChart";
import { OrderItem } from "@/components/Home/OrderItem";

// Hook for re-playable in-view animations
function useInViewAnimation(ref: RefObject<Element | null>) {
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, margin: "-65px 0px" });
  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);
  return controls;
}

// Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};
const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const ordersPerPage = 4;

  // Filter & paginate
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const ordersToday = allOrders.filter((o) => o.date === dateStr);
  const totalPages = Math.max(1, Math.ceil(ordersToday.length / ordersPerPage));
  const paged = ordersToday.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Refs + controls
  const ordersRef = useRef(null);
  const chartRef = useRef(null);
  const dailyStatsRef = useRef(null);
  const weeklyStatsRef = useRef(null);
  const dailyStatsCtrl = useInViewAnimation(dailyStatsRef);
  const weeklyStatsCtrl = useInViewAnimation(weeklyStatsRef);
  const ordersCtrl = useInViewAnimation(ordersRef);
  const chartCtrl = useInViewAnimation(chartRef);

  function handleView(id: number) {
    console.log("Xem chi tiết", id);
  }
  function handleEdit(id: number) {
    console.log("Sửa đơn", id);
  }
  function handleDelete(id: number) {
    console.log("Xóa đơn", id);
  }

  useEffect(() => {
    (async function () {
      ordersCtrl.set("hidden");
      await ordersCtrl.start("visible");
    })();
  }, [currentPage, selectedDate, ordersCtrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col bg-[url(https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes2.png)] bg-repeat-1"
    >
      <TopNav />

      <motion.main className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4">
        {/* Add order */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <Link
            to="/attend"
            className="w-full bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 text-white font-bold rounded-2xl shadow-lg px-4 py-3 flex items-center justify-center gap-2 hover:scale-105 transition"
          >
            <FaPlusCircle className="text-xl drop-shadow-sm" />
            <span className="drop-shadow-sm">Thêm thông tin giao đá</span>
          </Link>
        </motion.section>

        {/* Daily stats */}
        <motion.section
          ref={dailyStatsRef}
          initial="hidden"
          animate={dailyStatsCtrl}
          variants={containerVariants}
          className="grid grid-cols-3 gap-2 sm:gap-3 my-4"
        >
          {[
            {
              gradient: "from-pink-500 via-pink-400 to-rose-500",
              icon: (
                <FaIceCream className="text-white text-xl drop-shadow-sm" />
              ),
              title: "Đá cây",
              value: `${summary.daCay} cây`,
            },
            {
              gradient: "from-blue-500 via-sky-400 to-cyan-500",
              icon: <FaCube className="text-white text-xl drop-shadow-sm" />,
              title: "Đá bi",
              value: `${summary.daBi} bịch`,
            },
            {
              gradient: "from-emerald-500 via-green-400 to-teal-500",
              icon: (
                <FaMoneyBillWave className="text-white text-xl drop-shadow-sm" />
              ),
              title: "Doanh thu",
              value: summary.doanhThu.toLocaleString("vi-VN"),
            },
          ].map((stat, i) => (
            <motion.div key={i} variants={cardVariants}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.section>

        {/* Orders list */}
        <motion.section
          ref={ordersRef}
          initial="hidden"
          animate={ordersCtrl}
          variants={slideInVariants}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-700">Đơn giao đá hôm nay</h2>
            <CalendarChooser
              date={selectedDate}
              onChange={(d) => {
                setSelectedDate(d);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-2 max-h-72 overflow-y-auto">
            {paged.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                Không có đơn.
              </div>
            ) : (
              paged.map((o) => (
                <OrderItem
                  key={o.id}
                  order={o}
                  selected={selectedRecord === o.id}
                  onSelect={() =>
                    setSelectedRecord((r) => (r === o.id ? null : o.id))
                  }
                  onView={() => handleView(o.id)}
                  onEdit={() => handleEdit(o.id)}
                  onDelete={() => handleDelete(o.id)}
                />
              ))
            )}
          </div>
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-2"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </motion.section>

        {/* Weekly chart */}
        <motion.section
          ref={chartRef}
          initial="hidden"
          animate={chartCtrl}
          variants={slideInVariants}
          className="mb-4"
        >
          <h2 className="mb-2 font-semibold text-gray-700">
            Biểu đồ doanh thu theo tuần
          </h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-3"
          >
            <WeeklyRevenueAreaChart data={weeklyRevenueChart} />
          </motion.div>
        </motion.section>

        {/* Weekly stats */}
        <motion.section
          ref={weeklyStatsRef}
          initial="hidden"
          animate={weeklyStatsCtrl}
          variants={containerVariants}
          className="mb-4"
        >
          <h2 className="mb-2 font-semibold text-gray-700">
            Thống kê tuần này
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              gradient="from-emerald-500 via-green-400 to-teal-500"
              icon={
                <FaMoneyBillWave className="text-white text-xl drop-shadow-sm" />
              }
              title="Doanh thu tuần"
              value={`${weeklyStats.totalRevenue.toLocaleString("vi-VN")} ₫`}
              extra={
                <span className="flex items-center text-xs">
                  <FaArrowUp className="text-green-200 drop-shadow-sm" /> +
                  {weeklyStats.growthRate}%
                </span>
              }
            />
            <StatCard
              gradient="from-violet-500 via-purple-400 to-indigo-500"
              icon={
                weeklyStats.growthRate > 0 ? (
                  <FaArrowUp className="text-white text-xl drop-shadow-sm" />
                ) : (
                  <FaArrowDown className="text-white text-xl drop-shadow-sm" />
                )
              }
              title="Tăng trưởng"
              value={`${weeklyStats.growthRate}%`}
              subtitle="so với tuần trước"
            />
            <StatCard
              gradient="from-pink-500 via-rose-400 to-pink-600"
              icon={
                <FaIceCream className="text-white text-xl drop-shadow-sm" />
              }
              title="Đá cây tuần"
              value={`${weeklyStats.totalDaCay.toLocaleString("vi-VN")} cây`}
            />
            <StatCard
              gradient="from-blue-500 via-sky-400 to-cyan-500"
              icon={<FaCube className="text-white text-xl drop-shadow-sm" />}
              title="Đá bi tuần"
              value={`${weeklyStats.totalDaBi.toLocaleString("vi-VN")} bịch`}
            />
          </div>
        </motion.section>
      </motion.main>

      <BottomNav />
    </motion.div>
  );
}
