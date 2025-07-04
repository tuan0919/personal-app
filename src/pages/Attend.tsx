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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const customers = [
  { customerName: "Nguyễn văn A", customerId: 1 },
  { customerName: "Nguyễn văn B", customerId: 2 },
  { customerName: "Nguyễn văn C", customerId: 3 },
] as const;
import {
  FaUser,
  FaCube,
  FaMountain,
  FaBox,
  FaCheckCircle,
} from "react-icons/fa";

const formSchema = z.object({
  customerId: z.number().nonnegative({
    message: "Cần chọn một khách hàng để giao.",
  }),
  productType: z.string().nonempty({
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
      customerId: 0,
      productType: "1",
      amount: 0,
    },
  });

  function onSubmit(values: unknown) {
    console.log(values);
  }

  // Lấy giá trị loại đá đang chọn
  const selectedType = form.watch("productType");

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] pt-4 pb-24">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6 mt-2">
        <h2 className="text-center text-xl font-bold text-gray-900 mb-2 tracking-wide flex items-center justify-center gap-2">
          <FaCube className="text-pink-400" /> Thêm thông tin giao hàng
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Chọn khách hàng */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FaUser className="text-pink-400" /> Khách hàng
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-base font-normal",
                            !field.value && "text-gray-400"
                          )}
                        >
                          {field.value
                            ? customers.find(
                                (customer) =>
                                  customer.customerId === field.value
                              )?.customerName
                            : "Lựa chọn khách hàng"}
                          <MdOutlineKeyboardArrowDown className="ml-2 h-5 w-5 text-gray-400" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-white/80 rounded-xl shadow-lg border border-white/30">
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
                                value={customer.customerName}
                                key={customer.customerId}
                                onSelect={() => {
                                  form.setValue(
                                    "customerId",
                                    customer.customerId
                                  );
                                }}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-pink-100 transition"
                              >
                                {customer.customerName}
                                {field.value === customer.customerId && (
                                  <FaCheck className="ml-2 text-green-500" />
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
            {/* Loại đá */}
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FaCube className="text-pink-400" /> Loại đá
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-3"
                    >
                      {/* Đá cây */}
                      <div
                        className={cn(
                          "flex items-center gap-2 px-4 py-3 rounded-xl border transition cursor-pointer w-full",
                          selectedType === "1"
                            ? "bg-pink-100 border-pink-400 shadow-lg ring-2 ring-pink-200"
                            : "bg-white/50 border-white/30 hover:bg-pink-50"
                        )}
                        onClick={() => form.setValue("productType", "1")}
                      >
                        <RadioGroupItem
                          value="1"
                          id="da-cay"
                          className="accent-pink-500"
                        />
                        <FaMountain
                          className={cn(
                            "text-xl",
                            selectedType === "1"
                              ? "text-pink-500"
                              : "text-gray-400"
                          )}
                        />
                        <label
                          htmlFor="da-cay"
                          className={cn(
                            "text-base font-medium",
                            selectedType === "1"
                              ? "text-pink-700"
                              : "text-gray-800"
                          )}
                        >
                          Đá cây
                        </label>
                        {selectedType === "1" && (
                          <FaCheckCircle className="ml-auto text-pink-500 text-xl" />
                        )}
                      </div>
                      {/* Đá viên */}
                      <div
                        className={cn(
                          "flex items-center gap-2 px-4 py-3 rounded-xl border transition cursor-pointer w-full",
                          selectedType === "2"
                            ? "bg-blue-100 border-blue-400 shadow-lg ring-2 ring-blue-200"
                            : "bg-white/50 border-white/30 hover:bg-blue-50"
                        )}
                        onClick={() => form.setValue("productType", "2")}
                      >
                        <RadioGroupItem
                          value="2"
                          id="da-vien"
                          className="accent-blue-500"
                        />
                        <FaCube
                          className={cn(
                            "text-xl",
                            selectedType === "2"
                              ? "text-blue-500"
                              : "text-gray-400"
                          )}
                        />
                        <label
                          htmlFor="da-vien"
                          className={cn(
                            "text-base font-medium",
                            selectedType === "2"
                              ? "text-blue-700"
                              : "text-gray-800"
                          )}
                        >
                          Đá viên
                        </label>
                        {selectedType === "2" && (
                          <FaCheckCircle className="ml-auto text-blue-500 text-xl" />
                        )}
                      </div>
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
                  <FormLabel className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FaBox className="text-pink-400" /> Số lượng giao
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min={1}
                        placeholder="Nhập số lượng"
                        className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-pink-200 transition pl-10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FaBox className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 text-lg pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 via-orange-400 to-green-400 hover:from-pink-500 hover:to-green-500 text-white font-semibold py-3 rounded-xl shadow-lg transition mt-2 flex items-center justify-center gap-2"
            >
              <FaCheckCircle className="text-xl" /> Xác nhận
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
