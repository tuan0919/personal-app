import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { motion } from "framer-motion";

const FormSchema = z
  .object({
    fullname: z.string().min(2, {
      message: "Họ và tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
      message: "Vui lòng nhập email hợp lệ.",
    }),
    password: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    }),
    confirmPassword: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Bạn đã đăng ký thành công", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <AuthLayout title="Đăng Ký" subtitle="Tạo tài khoản mới để sử dụng dịch vụ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Họ và tên
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Nguyễn Văn A"
                        className="pl-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="example@gmail.com"
                        className="pl-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="password"
                        className="pl-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Xác nhận mật khẩu
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="password"
                        className="pl-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                        placeholder="Xác nhận mật khẩu"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full uppercase font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Đăng Ký
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div
        className="mt-6 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <p className="text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/signin"
            className="text-purple-600 font-medium hover:text-purple-800 hover:underline transition-colors"
          >
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
