// CreateNewOrder.tsx
import { CreateNewOrderLayout } from "@/components/CreateNewOrder/CreateNewOrderLayout";
import { CreateNewOrderView } from "@/components/CreateNewOrder/CreateNewOrderView";
import { motion } from "framer-motion";
import { useCreateNewOrderAnimations } from "@/animations/useCreateNewOrderAnimations";
import { containerVariants } from "@/components/shared/animations";

export function CreateNewOrder() {
  const { refs, controls } = useCreateNewOrderAnimations();

  return (
    <CreateNewOrderLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <CreateNewOrderView refs={refs} controls={controls} />
      </motion.div>
    </CreateNewOrderLayout>
  );
}
