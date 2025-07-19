import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi, Locale } from "date-fns/locale";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom calendar component with styling
function CustomCalendar({
  selected,
  onSelect,
  className,
  locale,
}: {
  selected: Date;
  onSelect: (date: Date) => void;
  className?: string;
  locale: Locale;
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selected || new Date()
  );

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelect(newDate);
  };

  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();

  const isSelected = (day: number) =>
    selected &&
    selected.getDate() === day &&
    selected.getMonth() === currentMonth.getMonth() &&
    selected.getFullYear() === currentMonth.getFullYear();

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className={cn("calendar-container", className)}>
      {/* Header with month/year and navigation */}
      <div className="calendar-header bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-md rounded-t-lg p-3 flex justify-between items-center border border-white/20 shadow-lg">
        <Button
          onClick={prevMonth}
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
        </Button>
        <h3 className="text-white font-bold">
          {format(currentMonth, "MMMM yyyy", { locale })}
        </h3>
        <Button
          onClick={nextMonth}
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 bg-gray-100/80 backdrop-blur-sm py-2 border-x border-white/20">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 bg-white/80 backdrop-blur-md p-2 gap-1 rounded-b-lg border-x border-b border-white/30 shadow-inner">
        {/* Empty cells for days before the 1st of the month */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8"></div>
        ))}

        {/* Actual days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return (
            <Button
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full h-8 w-8 p-0 flex items-center justify-center text-sm transition-all",
                isToday(day) &&
                  "bg-gradient-to-br from-purple-500/90 to-pink-600/90 backdrop-blur-md text-white shadow-md border border-white/30",
                isSelected(day) &&
                  !isToday(day) &&
                  "bg-gradient-to-br from-blue-500/90 to-blue-600/90 backdrop-blur-md text-white shadow-md border border-white/30",
                !isSelected(day) &&
                  !isToday(day) &&
                  "hover:bg-gray-100/80 hover:backdrop-blur-md"
              )}
            >
              {day}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarChooser({
  date,
  onChange,
}: {
  date: Date;
  onChange: (d: Date) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Hiển thị ngày hiện tại */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-gray-300 bg-white/80 hover:bg-gray-50 shadow-sm"
        >
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium">
            {format(date, "dd/MM/yyyy", { locale: vi })}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </PopoverTrigger>

      {/* Popup calendar */}
      <PopoverContent
        className="p-0 overflow-hidden rounded-lg shadow-xl border border-white/30 bg-white/60 backdrop-blur-md w-auto"
        align="end"
      >
        <CustomCalendar
          selected={date}
          onSelect={(d: Date) => {
            onChange(d as Date);
            setOpen(false);
          }}
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
}
