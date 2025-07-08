import { useState } from "react";
import {
  FaCheckCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import {
  format,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";
import { vi } from "date-fns/locale";

interface CustomCalendarProps {
  deliveredDates: string[];
}

export function CustomCalendar({ deliveredDates }: CustomCalendarProps) {
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
