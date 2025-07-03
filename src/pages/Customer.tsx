import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { GrAd } from "react-icons/gr";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function ProfileInfo() {
  return (
    <div className="flex flex-col gap-5">
      {/* row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-2 rounded-md">
            <GrAd color="white" />
          </div>
          <div className="font-medium text-xl">Tài khoản</div>
        </div>
        <span className="font-normal">@username</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-2 rounded-md">
            <MdDriveFileRenameOutline color="white" />
          </div>
          <div className="font-medium text-xl">Họ tên</div>
        </div>
        <span className="font-normal">Nguyễn Văn A</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-2 rounded-md">
            <MdOutlinePhone color="white" />
          </div>
          <div className="font-medium text-xl">SĐT</div>
        </div>
        <span className="font-normal">+84 123 456 789</span>
      </div>
    </div>
  );
}

function ProfileFormEditing() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function Attend() {
  return (
    <div className="h-[100vh]">
      <TopNav />
      <div className="h-16"></div>
      <div className="m-10 bg-gray-50 shadow-md overflow-hidden rounded-md">
        <div className="bg-indigo-500 h-30 flex items-center">
          <div className="rounded-full w-20 h-20 m-3 overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white">@username</span>
            <span className="font-bold text-3xl text-white">Nguyễn văn A</span>
          </div>
        </div>
        <div className="p-3 ">
          <ProfileInfo />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
