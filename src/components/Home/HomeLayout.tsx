import { ReactNode } from 'react';
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { FilterButton } from "@/components/Home/user/FilterButton";

interface HomeLayoutProps {
  children: ReactNode;
  onFilterClick: () => void;
}

export function HomeLayout({ children, onFilterClick }: HomeLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <TopNav />
      
      <motion.main
        className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      {/* Floating Filter Button */}
      <FilterButton onClick={onFilterClick} />
      <BottomNav />
    </div>
  );
}
