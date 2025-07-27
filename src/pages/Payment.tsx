// Payment.tsx
import { PaymentContent } from "@/components/Payment/PaymentContent";
import { PaymentProvider } from "@/contexts";

export const Payment: React.FC = () => {
  return (
    <PaymentProvider>
      <PaymentContent />
    </PaymentProvider>
  );
};
