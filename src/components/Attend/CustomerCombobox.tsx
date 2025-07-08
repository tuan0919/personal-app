// /components/Attend/CustomerCombobox.tsx
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { allCustomers } from "@/static/mockCustomers";
import { sectionVariants, cardVariants } from "./animations";
import { cn } from "@/lib/utils";

interface CustomerComboboxProps {
  value: number;
  onChange: (value: number) => void;
}

export function CustomerCombobox({ value, onChange }: CustomerComboboxProps) {
  const [open, setOpen] = useState(false);
  const selectedCustomer =
    allCustomers.find((c) => c.customerId === value) || null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between px-2 py-1 text-xs sm:text-sm rounded-md",
            !selectedCustomer && "text-gray-400"
          )}
        >
          {selectedCustomer ? selectedCustomer.customerName : "Chọn khách hàng"}
          <MdOutlineKeyboardArrowDown className="ml-1 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Command>
            <CommandInput placeholder="Tìm khách hàng..." className="h-9" />
            <CommandEmpty>Không tìm thấy</CommandEmpty>
            <CommandGroup>
              <CommandList className="max-h-60 overflow-auto">
                {allCustomers.map((c) => (
                  <motion.div key={c.customerId} variants={cardVariants}>
                    <CommandItem
                      value={c.customerName}
                      onSelect={() => {
                        onChange(c.customerId);
                        setOpen(false);
                      }}
                      className="flex items-center justify-between px-2 py-1 hover:bg-pink-50"
                    >
                      <span>{c.customerName}</span>
                      {c.delivered && (
                        <FaCheckCircle className="text-emerald-500 w-4 h-4" />
                      )}
                    </CommandItem>
                  </motion.div>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
