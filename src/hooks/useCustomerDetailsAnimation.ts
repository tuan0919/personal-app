// useReplayAnim.ts
import { useAnimation, useInView } from "framer-motion";
import { RefObject, useEffect } from "react";

export function useCustomerDetailsAnimation(
  ref: RefObject<Element | null>,
  deps: unknown[] = []
) {
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, margin: "0px" });

  useEffect(() => {
    controls.set("hidden");
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView, ...deps]);

  return controls;
}
