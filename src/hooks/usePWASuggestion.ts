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
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  // Check if app is already installed as PWA
  function isInStandaloneMode(): boolean {
    return (
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      (window.navigator as { standalone?: boolean }).standalone === true
    );
  }

  // Listen for page load completion
  useEffect(() => {
    const handlePageLoad = () => {
      // Add a small delay to ensure all content is rendered
      setTimeout(() => {
        setIsPageLoaded(true);
      }, 1000); // 1 second delay after page load
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  // PWA installation prompt handler
  useEffect(() => {
    if (!isMobile() || isInStandaloneMode() || !isPageLoaded) {
      setShouldSuggest(false);
      return;
    }

    const beforeInstallPromptHandler = (e: Event) => {
      e.preventDefault();
      const beforeInstallPromptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(beforeInstallPromptEvent);

      // Only show suggestion if page is fully loaded
      if (isPageLoaded) {
        setShouldSuggest(true);
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      beforeInstallPromptHandler as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler as EventListener
      );
    };
  }, [isPageLoaded]);

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
