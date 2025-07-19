import { useState } from "react";
import { z } from "zod";

export const formSchema = z.object({
  customerId: z.number().nonnegative({ message: "Cần chọn khách hàng." }),
  productType: z.number().nonnegative({ message: "Cần chọn loại đá." }),
  amount: z.number().min(1, { message: "Số lượng ≥ 1." }),
});

export type FormValues = z.infer<typeof formSchema>;

export function useCreateNewOrderState() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  // Định nghĩa đơn giá
  const priceMapping: Record<number, number> = {
    1: 10000, // Đá cây
    2: 15000, // Đá viên
  };

  function handleSubmit(values: FormValues) {
    setPendingValues(values);
    setOpenConfirm(true);
  }

  function handleConfirm() {
    // Thực hiện submit thực sự ở đây
    console.log(pendingValues);
    setOpenConfirm(false);
    setPendingValues(null);
    // Nếu muốn reset form sau khi xác nhận:
    // form.reset();
  }

  function handleClose() {
    setOpenConfirm(false);
    setPendingValues(null);
  }

  return {
    openConfirm,
    pendingValues,
    priceMapping,
    handleSubmit,
    handleConfirm,
    handleClose,
  };
}
