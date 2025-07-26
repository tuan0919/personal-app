import { useRef, useEffect } from "react";
import { useAnimation } from "framer-motion";

export interface ActivityHistoryAnimationRefs {
  content: React.RefObject<HTMLDivElement | null>;
  filter: React.RefObject<HTMLDivElement | null>;
}

export interface ActivityHistoryControlsType {
  content: ReturnType<typeof useAnimation>;
  filter: ReturnType<typeof useAnimation>;
}

export function useActivityHistoryAnimations() {
  const refs: ActivityHistoryAnimationRefs = {
    content: useRef<HTMLDivElement>(null),
    filter: useRef<HTMLDivElement>(null),
  };

  const controls: ActivityHistoryControlsType = {
    content: useAnimation(),
    filter: useAnimation(),
  };

  // Thêm animation khi component mount
  useEffect(() => {
    // Kích hoạt animation cho phần filter
    controls.filter.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    });

    // Kích hoạt animation cho phần content chính
    controls.content.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 },
    });

    return () => {
      // Cleanup khi unmount
      controls.filter.stop();
      controls.content.stop();
    };
  }, []);

  // Hàm để restart animation (sẽ gọi khi filter/phân trang thay đổi)
  const restartContentAnimation = () => {
    controls.content.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  };

  return { refs, controls, restartContentAnimation };
}
