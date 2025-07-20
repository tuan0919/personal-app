import { ReactNode } from "react";
import { TopNav } from "@/components/shared/navigation/TopNav";
import { BottomNav } from "@/components/shared/navigation/BottomNav";
import { PWASuggestionDialog } from "@/components/Home/PWASuggestionDialog";
import { usePWASuggestion } from "@/hooks/usePWASuggestion";

interface HomeLayoutProps {
  children: ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
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
