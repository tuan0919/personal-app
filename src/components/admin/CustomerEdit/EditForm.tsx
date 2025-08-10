import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaPhone, FaTag } from "react-icons/fa";

import { Customer } from "@/types/admin/customer-management-page-types";
import { CustomerEditFormValues } from "@/types/admin/customer-edit-page-types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  containerVariants,
  itemVariants,
} from "@/components/shared/animations";

// Schema for form validation
const formSchema = z.object({
  customerName: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự." }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Số điện thoại không hợp lệ." }),
  price1: z.number().min(0, { message: "Giá phải là số dương." }),
  price2: z.number().min(0, { message: "Giá phải là số dương." }),
  avatar: z.string().optional(),
});

interface EditFormProps {
  customer: Customer | null;
  onSubmit: (data: CustomerEditFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const EditForm = ({
  customer,
  onSubmit,
  onCancel,
  isSubmitting,
}: EditFormProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<CustomerEditFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      address: "",
      phoneNumber: "",
      price1: 0,
      price2: 0,
      avatar: "",
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        customerName: customer.customerName,
        address: customer.address,
        phoneNumber: customer.phoneNumber,
        price1: customer.price1,
        price2: customer.price2,
        avatar: customer.avatar,
      });
      setAvatarPreview(customer.avatar || null);
    }
  }, [customer, form]);

  const handleFormSubmit = (values: CustomerEditFormValues) => {
    onSubmit(values);
  };

  const onSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();
    if (isValid) {
      setIsAlertOpen(true);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        form.setValue("avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!customer) {
    return (
      <div className="text-center py-16 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl">
        <p className="text-gray-600 dark:text-gray-300">
          Không tìm thấy khách hàng.
        </p>
      </div>
    );
  }

  return (
    <>
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
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                avatarPreview ||
                `https://i.pravatar.cc/150?u=${customer.customerId}`
              }
              alt={customer.customerName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-md mb-4"
            />
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-sm text-pink-600 hover:underline"
            >
              Thay đổi ảnh đại diện
            </label>
          </div>

          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4"
              variants={containerVariants}
            >
              {/* Form Fields */}
              <FormFieldItem
                name="customerName"
                label="Tên khách hàng"
                icon={FaUser}
                control={form.control}
              />
              <FormFieldItem
                name="address"
                label="Địa chỉ"
                icon={FaMapMarkerAlt}
                control={form.control}
              />
              <FormFieldItem
                name="phoneNumber"
                label="Số điện thoại"
                icon={FaPhone}
                control={form.control}
                type="tel"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormFieldItem
                  name="price1"
                  label="Giá đá bi (VNĐ)"
                  icon={FaTag}
                  control={form.control}
                  type="number"
                />
                <FormFieldItem
                  name="price2"
                  label="Giá đá cây (VNĐ)"
                  icon={FaTag}
                  control={form.control}
                  type="number"
                />
              </div>

              {/* Buttons */}
              <motion.div variants={itemVariants} className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onSaveClick}
                  disabled={isSubmitting}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 text-white font-bold text-xs sm:text-base shadow"
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>

                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 py-2 rounded-xl border-pink-200 text-pink-600 font-bold text-xs sm:text-base shadow"
                >
                  Hủy
                </Button>
              </motion.div>
            </motion.form>
          </Form>
        </motion.div>
      </motion.div>

      <ConfirmDialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={form.handleSubmit(handleFormSubmit)}
        title="Xác nhận lưu thay đổi?"
        message="Bạn có chắc chắn muốn lưu các thông tin đã thay đổi cho khách hàng này không?"
      />
    </>
  );
};

import { Control } from "react-hook-form";

// Prop types for the helper component
interface FormFieldItemProps {
  name: keyof CustomerEditFormValues;
  label: string;
  icon: React.ElementType;
  control: Control<CustomerEditFormValues>;
  type?: string;
}

// Helper component for FormField to reduce repetition
const FormFieldItem = ({
  name,
  label,
  icon: Icon,
  control,
  type = "text",
}: FormFieldItemProps) => (
  <motion.div variants={itemVariants}>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs sm:text-sm font-semibold text-pink-500 mb-1 flex items-center gap-1">
            <Icon className="w-4 h-4" /> {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={`Nhập ${label.toLowerCase()}...`}
              className="w-full px-2 py-1 text-xs sm:text-sm rounded-md border"
              value={type === "number" && field.value === 0 ? "" : field.value}
              onChange={(e) => {
                const value =
                  type === "number"
                    ? parseInt(e.target.value, 10) || 0
                    : e.target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </motion.div>
);
