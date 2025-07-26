import { useState, useEffect, useCallback } from "react";
import localforage from "localforage";

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Mở rộng interface Navigator để bao gồm thuộc tính standalone cho Safari
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

const LAST_PROMPT_KEY = "lastPWAPromptTime";
const PROMPT_INTERVAL_DAYS = 7; // Prompt again after 7 days if dismissed

export const usePWASuggestion = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  const checkAndShowPrompt = useCallback(async () => {
    if (isAppInstalled) return;

    const lastPromptTime = await localforage.getItem<number>(LAST_PROMPT_KEY);
    const now = Date.now();

    if (
      !lastPromptTime ||
      (now - lastPromptTime) / (1000 * 60 * 60 * 24) >= PROMPT_INTERVAL_DAYS
    ) {
      setShowPrompt(true);
    }
  }, [isAppInstalled]);

  useEffect(() => {
    // Check if the app is already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      document.referrer.startsWith("android-app://") ||
      (navigator as NavigatorWithStandalone).standalone
    ) {
      setIsAppInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      checkAndShowPrompt();
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      localforage.removeItem(LAST_PROMPT_KEY); // Clear prompt time on install
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [checkAndShowPrompt]);

  const handleInstallClick = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the PWA install prompt");
      } else {
        console.log("User dismissed the PWA install prompt");
        await localforage.setItem(LAST_PROMPT_KEY, Date.now()); // Record dismissal time
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  }, [deferredPrompt]);

  const handleClosePrompt = useCallback(async () => {
    setShowPrompt(false);
    if (deferredPrompt) {
      await localforage.setItem(LAST_PROMPT_KEY, Date.now()); // Record dismissal time
    }
  }, [deferredPrompt]);

  return {
    showPWAPrompt: showPrompt && !isAppInstalled && !!deferredPrompt,
    handleInstallPWA: handleInstallClick,
    handleClosePWAPrompt: handleClosePrompt,
  };
};
