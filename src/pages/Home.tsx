import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaCube,
  FaIceCream,
  FaMoneyBillWave,
  FaTruckFast,
  FaPeopleCarryBox,
} from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineUpdate } from "react-icons/md";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";
import { allOrders, revenueChart, summary } from "@/static/mock-data";
import { CalendarChooser } from "@/components/Home/CalendarChooser";
import { StatCard } from "@/components/Home/StatCard";
import { RevenueLineChart } from "@/components/Home/RevenueLineChart";

export default function Home() {
  // State ngày chọn
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-50">
      <TopNav />
      <main className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4">
        {/* Thêm thông tin giao đá */}
        <section className="mb-4">
          <Link
            to="/attend"
            className="block w-full bg-gradient-to-r from-pink-400 via-pink-300 to-green-300 text-white font-bold rounded-2xl shadow-lg px-4 py-3 text-center text-base flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <FaPlusCircle className="text-xl" />
            Thêm thông tin giao đá
          </Link>
        </section>

        {/* Thống kê trong ngày */}
        <section className="mb-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatCard
              icon={<FaIceCream className="text-white text-xl" />}
              title="Đá cây"
              value={`${summary.daCay} cây`}
              gradient="from-pink-400 via-pink-300 to-pink-500"
            />
            <StatCard
              icon={<FaCube className="text-white text-xl" />}
              title="Đá bi"
              value={`${summary.daBi} bịch`}
              gradient="from-sky-400 via-blue-300 to-blue-500"
            />
            <StatCard
              icon={<FaMoneyBillWave className="text-white text-xl" />}
              title="Doanh thu"
              value={summary.doanhThu.toLocaleString("vi-VN")}
              gradient="from-green-400 via-green-300 to-emerald-500"
            />
          </div>
        </section>

        {/* Đơn giao đá theo ngày */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
              Đơn giao đá theo ngày
            </h2>
            <CalendarChooser date={selectedDate} onChange={handleDateChange} />
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow max-h-64 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              {pagedOrders.length === 0 && (
                <li className="p-4 text-center text-gray-400 text-sm">
                  Không có đơn giao nào trong ngày này.
                </li>
              )}
              {pagedOrders.map((o) => (
                <li key={o.id} className="px-3 py-2">
                  <div className="flex items-start gap-3">
                    <TbTruckDelivery className="text-pink-400 text-2xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-[13px] sm:text-sm line-clamp-1">
                        {o.customer}
                      </p>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-gray-600">
                        <span>
                          <FaIceCream className="inline mr-0.5 text-pink-400" />
                          {o.daCay} cây
                        </span>
                        <span>
                          <FaCube className="inline mr-0.5 text-sky-400" />
                          {o.daBi} bịch
                        </span>
                        <span>
                          <FaMoneyBillWave className="inline mr-0.5 text-emerald-400" />
                          {o.revenue.toLocaleString("vi-VN")} ₫
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] sm:text-xs text-gray-500">
                        <FaUserCircle className="shrink-0" />
                        <span>Đã giao bởi</span>
                        <span className="font-medium">{o.shipper}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-2">
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
            </div>
          )}
        </section>

        {/* Biểu đồ doanh thu trong ngày */}
        <section className="mb-4">
          <h2 className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Biểu đồ doanh thu trong ngày
          </h2>
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-3">
            <RevenueLineChart data={revenueChart} />
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-8 mb-4">
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
            ].map((x) => (
              <Link
                key={x.label}
                to="#"
                className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-md border border-white/40 rounded-xl shadow p-2 gap-1"
              >
                {x.icon}
                <span className="text-[11px] sm:text-xs text-gray-700">
                  {x.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
