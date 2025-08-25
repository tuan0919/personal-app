import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaPhone, FaTag } from "react-icons/fa";
import { CustomerNewFormValues } from "@/types/api/admin/customer-new-page-types";
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
import { Control } from "react-hook-form";

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

interface NewFormProps {
  onSubmit: (data: CustomerNewFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const NewForm = ({ onSubmit, onCancel, isSubmitting }: NewFormProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<CustomerNewFormValues>({
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

  const handleFormSubmit = (values: CustomerNewFormValues) => {
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
              src={avatarPreview || `https://i.pravatar.cc/150?u=new`}
              alt="new-customer"
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
              className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow hover:shadow-lg transition-all duration-300"
            >
              Tải ảnh đại diện
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
                  {isSubmitting ? "Đang tạo..." : "Tạo khách hàng"}
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
        title="Xác nhận tạo khách hàng?"
        message="Bạn có chắc chắn muốn tạo khách hàng mới với các thông tin đã nhập?"
      />
    </>
  );
};

// Prop types for the helper component
interface FormFieldItemProps {
  name: keyof CustomerNewFormValues;
  label: string;
  icon: React.ElementType;
  control: Control<CustomerNewFormValues>;
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
