import { ReactNode } from "react";
import PaymentNavbar from "@/components/Payment/PaymentNavbar";

interface PaymentLayoutProps {
  children: ReactNode;
}

export function PaymentLayout({ children }: PaymentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <PaymentNavbar />
      <main className="flex-1 overflow-y-auto px-3 pt-3 pb-24 sm:px-4">
        {children}
      </main>
    </div>
  );
}
