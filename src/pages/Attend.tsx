import BottomNav from "@/components/BottomNav";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const customers = [
  { customerName: "Nguyễn văn A", customerId: 1 },
  { customerName: "Nguyễn văn B", customerId: 2 },
  { customerName: "Nguyễn văn C", customerId: 3 },
] as const;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  customerId: z.number().nonnegative({
    message: "Please select a customer.",
  }),
});

function ProfileFormEditing() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      customerId: 0,
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
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Chọn khách hàng</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? customers.find(
                            (customer) => customer.customerId === field.value
                          )?.customerName
                        : "Lựa chọn khách hàng"}
                      <MdOutlineKeyboardArrowDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Tìm kiếm khách hàng..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Không tìm thấy khách hàng.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            value={customer.customerId + ""}
                            key={customer.customerId}
                            onSelect={() => {
                              form.setValue("customerId", customer.customerId);
                            }}
                          >
                            {customer.customerName}
                            <FaCheck
                              className={cn(
                                "ml-auto",
                                customer.customerId === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
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
      <AttendNavbar />
      <div className="h-16"></div>
      <div className="mx-3 my-2 rounded-md shadow-md overflow-hidden">
        <img src="/image.png" width={"100%"} alt="" />
      </div>
      <div className="m-3 ">
        <ProfileFormEditing />
      </div>
      <BottomNav />
    </div>
  );
}
