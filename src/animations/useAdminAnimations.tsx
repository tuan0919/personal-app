import { useAnimationControls } from "framer-motion";

interface UseAdminAnimationsReturn {
  controls: {
    pageEnter: () => void;
    pageExit: () => void;
    contentEnter: () => void;
    contentExit: () => void;
    filterEnter: () => void;
    filterExit: () => void;
  };
  variants: {
    page: {
      initial: object;
      animate: object;
      exit: object;
    };
    content: {
      initial: object;
      animate: object;
      exit: object;
    };
    filter: {
      initial: object;
      animate: object;
      exit: object;
    };
  };
}

export const useAdminAnimations = (): UseAdminAnimationsReturn => {
  const pageControls = useAnimationControls();
  const contentControls = useAnimationControls();
  const filterControls = useAnimationControls();

  const controls = {
    pageEnter: () => pageControls.start("animate"),
    pageExit: () => pageControls.start("exit"),
    contentEnter: () => contentControls.start("animate"),
    contentExit: () => contentControls.start("exit"),
    filterEnter: () => filterControls.start("animate"),
    filterExit: () => filterControls.start("exit"),
  };

  const variants = {
    page: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    content: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    filter: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
  };

  return { controls, variants };
};
