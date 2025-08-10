// Home.tsx
import { useLocation } from "react-router-dom";
import { AdminHome } from "@/pages/admin";
import { UserHome } from "../user/UserHome";

export function Home() {
  const location = useLocation();
  const isAdminFromState = location.state?.isAdmin || false;

  return isAdminFromState ? <AdminHome /> : <UserHome />;
}
