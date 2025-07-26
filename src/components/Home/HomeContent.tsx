// HomeContent.tsx - Main content component that uses HomeContext
import { PWASuggestionDialog } from "@/components/Home/PWASuggestionDialog";
import { FilterSheet } from "@/components/Home/user/FilterSheet";
import { HomeLayout } from "@/components/Home/HomeLayout";
import { UserView } from "@/components/Home/UserView";
import { AdminView } from "@/components/Home/AdminView";
import { useHomeContext } from "@/contexts";
import { useState } from "react";

export function HomeContent() {
  const {
    // PWA state
    showPWAPrompt,
    handleInstallPWA,
    handleClosePWAPrompt,
    // User type
    isAdmin,
  } = useHomeContext();

  // Filter state - now managed locally since it's user-specific
  const [filterOpen, setFilterOpen] = useState(false);

  const handleApplyFilter = () => {
    // The UserView will handle applying these filters through its own state
    setFilterOpen(false);
  };

  return (
    <HomeLayout>
      {/* Filter Sheet */}
      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilter}
      />

      {/* PWA Suggestion Dialog */}
      <PWASuggestionDialog
        open={!!showPWAPrompt}
        onClose={handleClosePWAPrompt}
        onInstall={handleInstallPWA}
      />

      {/* Main Content */}
      {!isAdmin ? <UserView /> : <AdminView />}
    </HomeLayout>
  );
}
