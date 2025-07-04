import BottomNav from "@/components/BottomNav";
import z from "zod";
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

const customers = [
  { customerName: "Nguyễn văn A", customerId: 1 },
  { customerName: "Nguyễn văn B", customerId: 2 },
  { customerName: "Nguyễn văn C", customerId: 3 },
] as const;
import { FaUser, FaCube, FaBox, FaCheck } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  customerId: z.number().nonnegative({
    message: "Cần chọn một khách hàng để giao.",
  }),
  productType: z.number().nonnegative({
    message: "Cần chọn một loại đá.",
  }),
  amount: z.number().min(1, {
    message: "Số lượng phải lớn hơn hoặc bằng 1.",
  }),
});

function ProfileFormEditing() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: -1,
      amount: 0,
      productType: -1, // -1 là giá trị mặc định chưa chọn loại đá
    },
  });

  function onSubmit(values: unknown) {
    console.log(values);
  }

  // Lấy giá trị loại đá đang chọn
  const selectedType = form.watch("productType");
  // Lấy giá trị khách hàng đang chọn
  const selectedCustomerId = form.watch("customerId");
  const selectedCustomer =
    customers.find((c) => c.customerId === Number(selectedCustomerId)) || null;
  const [openCustomer, setOpenCustomer] = useState(false);
  return (
    <div className="flex-1 px-2 py-4 sm:px-4">
      <div className="bg-white rounded-2xl shadow p-3 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Khách hàng - Combobox đẹp */}
            <FormField
              control={form.control}
              name="customerId"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-pink-500 mb-1">
                    <FaUser className="w-4 h-4" />
                    Lựa chọn khách hàng
                  </FormLabel>
                  <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCustomer}
                        className={cn(
                          "w-full justify-between px-2 py-1 text-xs sm:text-sm font-normal border rounded-md",
                          !selectedCustomer && "text-muted-foreground"
                        )}
                      >
                        {selectedCustomer
                          ? selectedCustomer.customerName
                          : "Chọn khách hàng"}
                        <MdOutlineKeyboardArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Tìm khách hàng..."
                          className="h-9"
                        />
                        <CommandEmpty>Không tìm thấy khách hàng.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {customers.map((customer) => (
                              <CommandItem
                                key={customer.customerId}
                                value={customer.customerName}
                                onSelect={() => {
                                  form.setValue(
                                    "customerId",
                                    customer.customerId
                                  );
                                  setOpenCustomer(false);
                                }}
                                className="flex items-center justify-between"
                              >
                                <span>{customer.customerName}</span>
                                {Number(selectedCustomerId) ===
                                  customer.customerId && (
                                  <FaCheck className="ml-2 h-3 w-3 text-green-500" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Loại đá - RadioGroup hoạt động đúng */}
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-pink-500 mb-1">
                    <FaCube className="w-4 h-4" />
                    Loại đá
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value > 0 ? String(field.value) : "-1"}
                      onValueChange={(val) => field.onChange(Number(val))}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <label
                        className={cn(
                          "flex items-center gap-2 flex-1 min-w-0 rounded-lg border-2 px-2 py-1 text-xs sm:text-sm font-semibold cursor-pointer",
                          selectedType === 1
                            ? "border-pink-400 bg-pink-50 text-pink-600"
                            : "border-gray-300 bg-gray-50 text-gray-600"
                        )}
                      >
                        <RadioGroupItem value="1" className="w-4 h-4" />
                        Đá cây
                      </label>
                      <label
                        className={cn(
                          "flex items-center gap-2 flex-1 min-w-0 rounded-lg border-2 px-2 py-1 text-xs sm:text-sm font-semibold cursor-pointer",
                          selectedType === 2
                            ? "border-pink-400 bg-pink-50 text-pink-600"
                            : "border-gray-300 bg-gray-50 text-gray-600"
                        )}
                      >
                        <RadioGroupItem value="2" className="w-4 h-4" />
                        Đá viên
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Số lượng giao */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-pink-500 mb-1">
                    <FaBox className="w-4 h-4" />
                    Số lượng giao
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Nhập số lượng"
                      className="w-full rounded-md border px-2 py-1 text-xs sm:text-sm"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nút xác nhận */}
            <Button
              type="submit"
              className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-400 to-green-300 text-white font-bold text-xs sm:text-base shadow-md"
            >
              Xác nhận
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export function Attend() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-orange-100 relative">
      <AttendNavbar />
      <div className="h-16"></div>
      <ProfileFormEditing />
      <BottomNav />
    </div>
  );
}
