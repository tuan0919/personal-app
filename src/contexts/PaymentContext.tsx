import { createContext, useContext, ReactNode } from "react";
import { usePaymentState } from "@/hooks/usePaymentState";

// Context types for Payment - using the same type as the hook return
type PaymentContextType = ReturnType<typeof usePaymentState>;

// Create context
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Provider props
interface PaymentProviderProps {
  children: ReactNode;
}

// Provider component
export function PaymentProvider({ children }: PaymentProviderProps) {
  // Use payment state hook for all payment-related state
  const paymentState = usePaymentState();

  // Context value is the entire payment state
  const contextValue: PaymentContextType = {
    ...paymentState,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
}

// Custom hook to use the context
export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
}

// Export types for use in components
export type { PaymentContextType };
