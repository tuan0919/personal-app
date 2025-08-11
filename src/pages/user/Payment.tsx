import { Layout, View } from "@/components/user/Payment";
import { PaymentProvider } from "@/contexts/PaymentContext";

// Payment.tsx
export const Payment: React.FC = () => {
  return (
    <Layout>
      <PaymentProvider>
        <View/>
      </PaymentProvider>
    </Layout>
  );
};
