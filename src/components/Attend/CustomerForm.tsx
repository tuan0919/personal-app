// /components/Attend/CustomerForm.tsx
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
import { FaUser, FaCube, FaBox } from "react-icons/fa6";
import { containerVariants, itemVariants } from "./animations";
import { CustomerCombobox } from "./CustomerCombobox";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  customerId: z.number().nonnegative({ message: "Cần chọn khách hàng." }),
  productType: z.number().nonnegative({ message: "Cần chọn loại đá." }),
  amount: z.number().min(1, { message: "Số lượng ≥ 1." }),
});

export function CustomerForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { customerId: -1, productType: -1, amount: 0 },
  });

  const selectedType = form.watch("productType");

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
        <h2 className="text-lg font-semibold text-pink-600 mb-4">
          Thêm khách hàng mới
        </h2>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            variants={containerVariants}
          >
            {/* Customer Combobox */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-pink-500 mb-1 flex items-center gap-1">
                      <FaUser className="w-4 h-4" /> Khách hàng
                    </FormLabel>
                    <CustomerCombobox
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Submit Button */}
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
