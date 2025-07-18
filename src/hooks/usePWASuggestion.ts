import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// Detect if device is mobile
function isMobile() {
  return /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(
    typeof navigator === "undefined" ? "" : navigator.userAgent
  );
}

export function usePWASuggestion() {
  const [shouldSuggest, setShouldSuggest] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // Check if app is already installed as PWA
  function isInStandaloneMode(): boolean {
    return (
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      (window.navigator as { standalone?: boolean }).standalone === true
    );
  }

  useEffect(() => {
    if (!isMobile() || isInStandaloneMode()) {
      setShouldSuggest(false);
      return;
    }
    const beforeInstallPromptHandler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShouldSuggest(true);
    };
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
    };
  }, []);

  const handleInstall = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setShouldSuggest(false);
        setDeferredPrompt(null);
      });
    }
  }, [deferredPrompt]);

  const handleClose = useCallback(() => {
    setShouldSuggest(false);
  }, []);

  return { shouldSuggest, handleClose, handleInstall };
}
