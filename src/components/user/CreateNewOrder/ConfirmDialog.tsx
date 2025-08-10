import React from "react";
import { ConfirmDialog as SharedConfirmDialog } from "@/components/shared/ConfirmDialog";

export interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return <SharedConfirmDialog {...props} />;
};
