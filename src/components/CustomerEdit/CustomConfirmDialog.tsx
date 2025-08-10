import { ConfirmDialog as SharedConfirmDialog } from "@/components/shared/ConfirmDialog";

export interface CustomConfirmDialogProps {
  open: boolean;
  message: string;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const CustomConfirmDialog = (props: CustomConfirmDialogProps) => {
  return <SharedConfirmDialog {...props} />;
};
