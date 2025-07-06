import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

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
          className="flex items-center px-2 py-1 text-xs"
        >
          <span>{format(date, "dd/MM/yyyy", { locale: vi })}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      {/* Popup calendar */}
      <PopoverContent className="p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onChange(d as Date);
            setOpen(false);
          }}
          initialFocus
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
}
