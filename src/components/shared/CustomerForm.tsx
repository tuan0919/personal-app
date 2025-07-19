import { z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FaUser, FaCube, FaBox, FaTag, FaReceipt } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { containerVariants, itemVariants } from "./animations";

/**
 * A unified customer form that can be used for both new orders and editing existing ones
 */

// Define schema for form validation
const formSchema = z.object({
  customerId: z.number().nonnegative({ message: "Cần chọn khách hàng." }),
  productType: z.number().nonnegative({ message: "Cần chọn loại đá." }),
  amount: z.number().min(1, { message: "Số lượng ≥ 1." }),
});

type FormValues = z.infer<typeof formSchema>;

// Define product prices
const priceMapping: Record<number, number> = {
  1: 35000, // Đá cây
  2: 18000, // Đá viên
};

export interface CustomerFormProps {
  customer?: {
    id?: number;
    customerId?: number;
    name?: string;
    customerName?: string;
    productType?: number;
    amount?: number;
  };
  onSubmit?: (values: FormValues) => void;
  onCancel?: () => void;
  isNewOrder?: boolean;
  // If using CustomerCombobox, it needs to be passed as a component
  CustomerCombobox?: React.ComponentType<{
    value: number;
    onChange: (value: number) => void;
  }>;
}

export function CustomerForm({
  customer,
  onSubmit,
  onCancel,
  isNewOrder = false,
  CustomerCombobox,
}: CustomerFormProps) {
  // Initialize default values based on edit mode or create mode
  const customerId = customer?.customerId || customer?.id || -1;
  const customerName = customer?.customerName || customer?.name || "";
  const defaultProductType = customer?.productType || -1;
  const defaultAmount = customer?.amount || 0;

  // Form setup with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId,
      productType: defaultProductType,
      amount: defaultAmount,
    },
  });

  // Handle changes to customer prop (for editing mode)
  useEffect(() => {
    if (customer) {
      form.reset({
        customerId: customerId,
        productType: defaultProductType,
        amount: defaultAmount,
      });
    }
  }, [customer, customerId, defaultProductType, defaultAmount, form]);

  // Watch form values for live calculation
  const selectedType = form.watch("productType");
  const amount = form.watch("amount");

  // Calculate pricing
  const unitPrice = selectedType > 0 ? priceMapping[selectedType] : 0;
  const totalPrice = unitPrice * amount;

  // Handle form submission
  function handleSubmit(values: FormValues) {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log("Form values:", values);
    }
  }

  return (
    <motion.div
      className="flex-1 px-2 py-4 sm:px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white/70 rounded-2xl shadow p-3 sm:p-6"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold text-pink-600 mb-4">
          {isNewOrder ? "Thêm đơn giao đá" : "Chỉnh sửa thông tin"}
        </h2>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
            variants={containerVariants}
          >
            {/* Customer selection - either Combobox or read-only display */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-pink-500 mb-1 flex items-center gap-1">
                      <FaUser className="w-4 h-4" /> Khách hàng
                    </FormLabel>
                    {isNewOrder && CustomerCombobox ? (
                      <CustomerCombobox
                        value={field.value}
                        onChange={field.onChange}
                      />
                    ) : (
                      <Input disabled value={customerName} readOnly />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Product Type Radio */}
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
                            {t === 1 ? "Đá cây" : "Đá viên"} (
                            {priceMapping[t].toLocaleString("vi-VN")}đ/đv)
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Amount Input */}
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
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          // Loại bỏ số 0 ở đầu nếu có
                          const val = e.target.value.replace(/^0+/, "");
                          // Nếu input rỗng thì set về 0, ngược lại parseInt
                          field.onChange(val === "" ? 0 : Number(val));
                        }}
                        min={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Price & Total */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-3 bg-pink-50 rounded-md">
                <div className="flex items-center gap-2">
                  <FaTag className="text-pink-500 w-5 h-5" />
                  <span className="text-sm text-gray-700">Đơn giá:</span>
                  <span className="text-sm font-semibold text-pink-600">
                    {unitPrice > 0
                      ? unitPrice.toLocaleString("vi-VN") + "đ"
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaReceipt className="text-pink-500 w-5 h-5" />
                  <span className="text-sm text-gray-700">Tổng tiền:</span>
                  <span className="text-sm font-semibold text-pink-600">
                    {unitPrice > 0
                      ? totalPrice.toLocaleString("vi-VN") + "đ"
                      : "-"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 text-white font-bold text-xs sm:text-base shadow"
              >
                Xác nhận
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 py-2 rounded-xl border-pink-200 text-pink-600 font-bold text-xs sm:text-base shadow"
                >
                  Hủy
                </Button>
              )}
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
    </motion.div>
  );
}
