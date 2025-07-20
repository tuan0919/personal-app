// Home.tsx
import { PWASuggestionDialog } from "@/components/Home/PWASuggestionDialog";
import { usePWASuggestion } from "@/hooks/usePWASuggestion";
import { FilterSheet } from "@/components/Home/user/FilterSheet";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import { useHomeState } from "@/hooks/useHomeState";
import { HomeLayout } from "@/components/Home/HomeLayout";
import { UserView } from "@/components/Home/UserView";
import { AdminView } from "@/components/Home/AdminView";
import { useLocation } from "react-router-dom";
export function Home() {
  const location = useLocation();
  const isAdminFromState = location.state?.isAdmin || false;

  // Custom hooks for state management
  const homeState = useHomeState({ initialIsAdmin: isAdminFromState });
  const { showPWAPrompt, handleInstallPWA, handleClosePWAPrompt } =
    usePWASuggestion();
  const { refs, controls } = useHomeAnimations();

  return (
    <HomeLayout>
      {/* Filter Sheet */}
      <FilterSheet
        open={homeState.filterOpen}
        onClose={() => homeState.setFilterOpen(false)}
        onApply={homeState.handleApplyFilter}
      />

      {/* PWA Suggestion Dialog */}
      <PWASuggestionDialog
        open={!!showPWAPrompt}
        onClose={handleClosePWAPrompt}
        onInstall={handleInstallPWA}
      />

      {/* Main Content */}
      {!homeState.isAdmin ? (
        <UserView
          deliveredCustomers={homeState.deliveredCustomers}
          loading={homeState.loading}
          error={homeState.error}
          onDeleteCustomer={homeState.handleDeleteCustomer}
          onUpdateCustomer={homeState.handleUpdateCustomer}
          onRetry={homeState.refetchData}
          onFilterClick={() => homeState.setFilterOpen(true)}
          selectedDate={homeState.selectedDate}
          onDateChange={homeState.handleDateChange}
        />
      ) : (
        <AdminView refs={refs} controls={controls} />
      )}
    </HomeLayout>
  );
}
