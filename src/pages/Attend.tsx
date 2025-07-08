// Attend.tsx
import BottomNav from "@/components/BottomNav";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AttendNavbar from "@/components/Attend/AttendNavbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { FaUser, FaCube, FaBox, FaTruckFast } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ─────────────── MOCK DATA ───────────────
type Customer = {
  customerId: number;
  customerName: string;
  delivered: boolean;
  address?: string;
  deliveryTime?: string;
};
const allCustomers: Customer[] = Array.from({ length: 25 }).map((_, i) => ({
  customerId: i + 1,
  customerName: `Khách hàng ${i + 1}`,
  delivered: i % 3 === 0,
  address: `${i + 1} Đường ABC`,
  deliveryTime: `${8 + (i % 8)}:${(i % 6) * 10}0`,
}));

// ────────────── ANIMATION VARIANTS ──────────────
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const sectionVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};
const pageTransition = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

// ────────────── FORM SCHEMA ──────────────
import { z } from "zod";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
const formSchema = z.object({
  customerId: z.number().nonnegative({ message: "Cần chọn khách hàng." }),
  productType: z.number().nonnegative({ message: "Cần chọn loại đá." }),
  amount: z.number().min(1, { message: "Số lượng ≥ 1." }),
});

// ────────────── PROFILE FORM COMPONENT ──────────────
function ProfileFormEditing() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { customerId: -1, productType: -1, amount: 0 },
  });
  const selectedType = form.watch("productType");
  const selectedCustomerId = form.watch("customerId");
  const selectedCustomer =
    allCustomers.find((c) => c.customerId === selectedCustomerId) || null;
  const [openCustomer, setOpenCustomer] = useState(false);

  function onSubmit(values: unknown) {
    console.log(values);
  }

  return (
    <motion.div
      className="flex-1 px-2 py-4 sm:px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-2xl shadow p-3 sm:p-6"
        variants={itemVariants}
      >
        {/* NEW HEADER */}
        <h2 className="text-lg font-semibold text-pink-600 mb-4">
          Thêm khách hàng mới
        </h2>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            variants={containerVariants}
          >
            {/* Combobox khách */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="customerId"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-pink-500 mb-1 flex items-center gap-1">
                      <FaUser className="w-4 h-4" /> Khách hàng
                    </FormLabel>
                    <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCustomer}
                          className={cn(
                            "w-full justify-between px-2 py-1 text-xs sm:text-sm rounded-md",
                            !selectedCustomer && "text-gray-400"
                          )}
                        >
                          {selectedCustomer
                            ? selectedCustomer.customerName
                            : "Chọn khách hàng"}
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
                            <CommandInput
                              placeholder="Tìm khách hàng..."
                              className="h-9"
                            />
                            <CommandEmpty>Không tìm thấy</CommandEmpty>
                            <CommandGroup>
                              <CommandList className="max-h-60 overflow-auto">
                                {allCustomers.map((c) => (
                                  <motion.div
                                    key={c.customerId}
                                    variants={cardVariants}
                                  >
                                    <CommandItem
                                      value={c.customerName}
                                      onSelect={() => {
                                        form.setValue(
                                          "customerId",
                                          c.customerId
                                        );
                                        setOpenCustomer(false);
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            {/* Loại đá */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-pink-500 mb-1 flex items-center gap-1">
                      <FaCube className="w-4 h-4" /> Loại đá
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value > 0 ? String(field.value) : "-1"}
                        onValueChange={(v) => field.onChange(Number(v))}
                        className="flex flex-col sm:flex-row gap-2"
                      >
                        {[1, 2].map((t) => (
                          <label
                            key={t}
                            className={cn(
                              "flex items-center gap-2 flex-1 px-2 py-1 rounded-lg border text-xs sm:text-sm cursor-pointer",
                              selectedType === t
                                ? "border-pink-600 bg-pink-50 text-pink-600"
                                : "border-gray-300 text-gray-600 hover:border-pink-300"
                            )}
                          >
                            <RadioGroupItem
                              value={String(t)}
                              className="w-4 h-4"
                            />
                            {t === 1 ? "Đá cây" : "Đá viên"}
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            {/* Số lượng */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-pink-500 mb-1 flex items-center gap-1">
                      <FaBox className="w-4 h-4" /> Số lượng
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Nhập số lượng"
                        className="w-full px-2 py-1 text-xs sm:text-sm rounded-md border"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            {/* Submit */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 text-white font-bold text-xs sm:text-base shadow"
              >
                Xác nhận
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
    </motion.div>
  );
}

// ────────────── Section Delivered Today ──────────────
function DeliveredTodaySection({ delivered }: { delivered: Customer[] }) {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const pages = Math.max(1, Math.ceil(delivered.length / perPage));
  const slice = delivered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.section
      className="px-2 sm:px-4 mb-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 p-4 rounded-t-2xl shadow-lg flex items-center gap-3">
        <FaClipboardList className="text-white w-6 h-6" />
        <h3 className="text-white font-bold text-base">
          Khách đã giao hôm nay
        </h3>
      </div>
      <motion.div
        className="bg-white p-3 rounded-b-2xl shadow-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-3">
          {slice.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              Chưa giao khách nào.
            </p>
          ) : (
            slice.map((c) => (
              <motion.div
                key={c.customerId}
                className="flex items-center gap-2 bg-pink-50 rounded-lg p-3"
                variants={cardVariants}
              >
                <FaTruckFast className="text-pink-600 w-5 h-5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{c.customerName}</p>
                  <p className="text-xs text-gray-500">
                    📍 {c.address} • 🕒 {c.deliveryTime}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
        {pages > 1 && (
          <motion.div
            className="mt-4 flex justify-center"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem aria-disabled={page === 1}>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                {Array.from({ length: pages }).map((_, i) => (
                  <PaginationItem key={i} aria-disabled={page === i + 1}>
                    <PaginationLink onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem aria-disabled={page === pages}>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}

// Main Attend component
export function Attend() {
  const deliveredToday = allCustomers.filter((c) => c.delivered);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-orange-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AttendNavbar />
      <ProfileFormEditing />
      <DeliveredTodaySection delivered={deliveredToday} />
      <div className="h-30" />
      <BottomNav />
    </motion.div>
  );
}
