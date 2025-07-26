// Home.tsx
import { HomeContent } from "@/components/Home/HomeContent";
import { HomeProvider } from "@/contexts";
import { useLocation } from "react-router-dom";

export function Home() {
  const location = useLocation();
  const isAdminFromState = location.state?.isAdmin || false;

  return (
    <HomeProvider initialIsAdmin={isAdminFromState}>
      <HomeContent />
    </HomeProvider>
  );
}
