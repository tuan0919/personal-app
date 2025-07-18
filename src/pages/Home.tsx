// Home.tsx
import { PWASuggestionDialog } from "@/components/Home/PWASuggestionDialog";
import { usePWASuggestion } from "@/hooks/usePWASuggestion";
import { FilterSheet } from "@/components/Home/user/FilterSheet";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import { useHomeState } from "@/hooks/useHomeState";
import { HomeLayout } from "@/components/Home/HomeLayout";
import { UserView } from "@/components/Home/UserView";
import { AdminView } from "@/components/Home/AdminView";
export function Home() {
  // Custom hooks for state management
  const homeState = useHomeState();
  const { shouldSuggest, handleClose, handleInstall } = usePWASuggestion();
  const { refs, controls } = useHomeAnimations();

  return (
    <HomeLayout onFilterClick={() => homeState.setFilterOpen(true)}>
      {/* Filter Sheet */}
      <FilterSheet 
        open={homeState.filterOpen} 
        onClose={() => homeState.setFilterOpen(false)} 
        onApply={homeState.handleApplyFilter} 
      />
      
      {/* PWA Suggestion Dialog */}
      <PWASuggestionDialog
        open={shouldSuggest}
        onClose={handleClose}
        onInstall={handleInstall}
      />
      
      {/* Main Content */}
      {!homeState.isAdmin ? (
        <UserView
          deliveredCustomers={homeState.deliveredCustomers}
          loading={homeState.loading}
          error={homeState.error}
          onDeleteCustomer={homeState.handleDeleteCustomer}
          onUpdateCustomer={homeState.handleUpdateCustomer}
        />
      ) : (
        <AdminView refs={refs} controls={controls} />
      )}
    </HomeLayout>
  );
}
