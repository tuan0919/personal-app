import { ReactNode } from "react";
import { TopNav } from "@/components/shared/TopNav";
import { BottomNav } from "@/components/shared/BottomNav";
import { PWASuggestionDialog } from "@/components/shared/PWASuggestionDialog";
import { usePWASuggestion } from "@/hooks/usePWASuggestion";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { showPWAPrompt, handleInstallPWA, handleClosePWAPrompt } =
    usePWASuggestion();

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <TopNav />
      <main className="flex-1 overflow-y-auto px-3 pt-3 sm:px-4">
        {children}
      </main>
      <BottomNav />
      <PWASuggestionDialog
        open={!!showPWAPrompt}
        onClose={handleClosePWAPrompt}
        onInstall={handleInstallPWA}
      />
    </div>
  );
}
