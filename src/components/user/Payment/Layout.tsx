import { ReactNode } from "react";
import {Navbar} from "./Navbar";

interface PaymentLayoutProps {
  children: ReactNode;
}

export function Layout({ children }: PaymentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <Navbar />
      <main className="flex-1 overflow-y-auto px-3 pt-3 pb-24 sm:px-4">
        {children}
      </main>
    </div>
  );
}
