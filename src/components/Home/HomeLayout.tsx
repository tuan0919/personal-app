import { ReactNode } from "react";
import TopNav from "@/components/TopNav";

interface HomeLayoutProps {
  children: ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <TopNav />
      <main className="flex-1 overflow-y-auto px-3 pt-3 sm:px-4">
        {children}
      </main>
    </div>
  );
}
