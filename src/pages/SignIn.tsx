import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FaRegUser, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { motion } from "framer-motion";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Tên tài khoản phải có ít nhất 2 chữ số.",
  }),
  password: z.string().min(3, {
    message: "Mật khẩu phải có ít nhất 3 chữ số",
  }),
});

export function SignIn() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "admin",
      password: "123",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { username, password } = data;
    let isAdmin = false;

    if (username === "admin" && password === "123") {
      isAdmin = true;
    } else if (username === "user" && password === "123") {
      isAdmin = false;
    } else {
      toast.error("Đăng nhập thất bại", {
        description: "Tên đăng nhập hoặc mật khẩu không đúng",
      });
      return;
    }

    toast.success("Đăng nhập thành công", {
      description: `Chào mừng ${username}!`,
    });

    navigate("/home", { state: { isAdmin } });
  }

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} login`, {
      description: `Đăng nhập bằng ${provider} đang được phát triển`,
    });
  };

  return (
    <AuthLayout title="GO MobileDX" subtitle="Đăng nhập để sử dụng dịch vụ">
      <div className="w-full max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username/Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <Input
                          placeholder="Username/Email"
                          className="pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl text-base shadow-sm"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <TbLockPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl text-base shadow-sm"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                to="/forgot-password"
                className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors block text-right"
              >
                Quên mật khẩu?
              </Link>
            </motion.div>

            {/* Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Đăng nhập
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Divider */}
        <motion.div
          className="my-6 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">
            HOẶC Tiếp tục với
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </motion.div>

        {/* Social Login Buttons */}
        <motion.div
          className="flex justify-center space-x-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <FaGoogle className="text-red-500 text-xl" />
          </button>
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
          <button
            onClick={() => handleSocialLogin("Twitter")}
            className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <FaTwitter className="text-blue-400 text-xl" />
          </button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-gray-600 text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/signup"
              className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors"
            >
              ĐĂNG KÝ
            </Link>
          </p>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
