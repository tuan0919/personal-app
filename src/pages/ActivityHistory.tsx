import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AttendNavbar from "@/components/CreateNewOrder/AttendNavbar";
import {
  FaPlus,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
} from "react-icons/fa";
import { activities as mockActivities } from "@/static/mockActivityHistory";
import type { ActivityHistory } from "@/static/mockActivityHistory";
import { Pagination } from "@/components/shared/Pagination";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TabSlider } from "@/components/ActivityHistory/TabSlider";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const ICON_MAP = {
  add: <FaPlus className="text-green-500 w-4 h-4" />,
  edit: <FaEdit className="text-blue-500 w-4 h-4" />,
  confirm: <FaCheckCircle className="text-pink-500 w-4 h-4" />,
  cancel: <FaTimesCircle className="text-red-500 w-4 h-4" />,
};

const PAGE_SIZE = 5;
const TABS = [
  { key: "all", label: "Tất cả" },
  { key: "add", icon: ICON_MAP.add, label: "Thêm đơn" },
  { key: "edit", icon: ICON_MAP.edit, label: "Sửa đơn" },
  { key: "confirm", icon: ICON_MAP.confirm, label: "Xác nhận thu" },
  { key: "cancel", icon: ICON_MAP.cancel, label: "Hủy xác nhận" },
];

function getMonthYearFromTime(time: string): { month: number; year: number } {
  const now = new Date();
  if (time.includes("tháng")) {
    const match = time.match(/(\d+) tháng/);
    if (match) {
      const diff = Number(match[1]);
      const d = new Date(now.getFullYear(), now.getMonth() - diff, 1);
      return { month: d.getMonth() + 1, year: d.getFullYear() };
    }
  }
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

export default function ActivityHistory() {
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState<{
    month: number;
    year: number;
  } | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Lọc theo tab, tháng
  const filtered = useMemo(() => {
    let arr = mockActivities;
    if (selectedTab !== "all") arr = arr.filter((a) => a.type === selectedTab);
    if (selectedMonth)
      arr = arr.filter((a) => {
        const { month, year } = getMonthYearFromTime(a.time);
        return month === selectedMonth.month && year === selectedMonth.year;
      });
    return arr;
  }, [selectedTab, selectedMonth]);

  // Sắp xếp
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortAsc) return mockActivities.indexOf(a) - mockActivities.indexOf(b);
      return mockActivities.indexOf(b) - mockActivities.indexOf(a);
    });
  }, [filtered, sortAsc]);

  // Phân trang
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const currentItems = sorted.slice(startIdx, startIdx + PAGE_SIZE);

  useMemo(() => {
    setPage(1);
  }, [selectedTab, selectedMonth, sortAsc]);

  const monthLabel = selectedMonth
    ? `Tháng ${selectedMonth.month}/${selectedMonth.year}`
    : "Tất cả tháng";

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <AttendNavbar />
      <motion.main
        className="flex-1 overflow-y-auto px-2 pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.section
          className="bg-white/70 rounded-2xl shadow p-3 sm:p-6 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-pink-600 text-center flex-1">
              Lịch sử hoạt động
            </h2>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="ml-2">
                  <FaFilter />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Bộ lọc chi tiết</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {/* TODO: Thêm các điều kiện filter chi tiết ở đây */}
                  <div className="text-gray-500 text-sm">
                    (Chức năng filter chi tiết sẽ bổ sung sau)
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Tabs slider */}
          <TabSlider
            tabs={TABS}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          {/* Bộ lọc tháng bằng calendar & sắp xếp */}
          <div className="flex gap-2 mb-4 items-center flex-wrap">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-[120px] flex justify-between items-center"
                >
                  {monthLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    selectedMonth
                      ? new Date(selectedMonth.year, selectedMonth.month - 1)
                      : undefined
                  }
                  onMonthChange={(date) => {
                    setSelectedMonth({
                      month: date.getMonth() + 1,
                      year: date.getFullYear(),
                    });
                    setCalendarOpen(false);
                  }}
                  onSelect={undefined}
                  fromYear={2023}
                  toYear={new Date().getFullYear()}
                  captionLayout="dropdown"
                  showOutsideDays={false}
                  className="rounded-xl border bg-white"
                  components={{
                    DayButton: (props) => (
                      <button style={{ display: "none" }} {...props} />
                    ),
                  }}
                />
                <div className="flex justify-end p-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSelectedMonth(null);
                      setCalendarOpen(false);
                    }}
                  >
                    Bỏ lọc
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setSortAsc((v) => !v)}
            >
              {sortAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
              {sortAsc ? "Cũ → Mới" : "Mới → Cũ"}
            </Button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={
                page +
                selectedTab +
                JSON.stringify(selectedMonth) +
                String(sortAsc)
              }
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              {currentItems.map((activity, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 bg-gradient-to-r from-pink-50/80 to-orange-50/80 rounded-xl px-5 py-3 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="flex-shrink-0 p-3 border-2 border-pink-200 bg-white/80 rounded-full flex items-center justify-center">
                    {ICON_MAP[activity.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">
                      {activity.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onChange={setPage}
              variant="simple"
            />
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
