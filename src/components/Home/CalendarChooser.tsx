import { useState } from "react";
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
// DatePicker sử dụng shadcn UI (Popover + Calendar)
export function CalendarChooser({
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
        <Button
          variant="outline"
          className={cn(
            "w-[130px] justify-start text-left font-normal text-xs px-2 py-1 border rounded-lg",
            !date && "text-muted-foreground"
          )}
        >
          <span>
            {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
          </span>
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
}
