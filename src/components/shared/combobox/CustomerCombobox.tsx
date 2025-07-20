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
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { mockCustomers } from "@/mocks/mockCustomers";
import { sectionVariants, cardVariants } from "@/components/shared/animations";
import { cn } from "@/lib/utils";
import { Customer } from "@/api/types";

interface CustomerComboboxProps {
  value: number;
  onChange: (value: number) => void;
}

export function CustomerCombobox({ value, onChange }: CustomerComboboxProps) {
  const [open, setOpen] = useState(false);
  const selectedCustomer =
    mockCustomers.find((c) => c.customerId === value) || null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className={cn(
            "w-full justify-between px-2 py-2 text-xs sm:text-sm rounded-md border flex",
            !selectedCustomer && "text-gray-400"
          )}
        >
          {selectedCustomer ? selectedCustomer.customerName : "Chọn khách hàng"}
          <MdOutlineKeyboardArrowDown className="ml-1 h-4 w-4 opacity-50" />
        </div>
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
                {mockCustomers.map((c: Customer, index: number) => (
                  <motion.div
                    key={`${c.customerId}-${index}`}
                    variants={cardVariants}
                  >
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
