import { useRef } from "react";
import { useAnimation } from "framer-motion";

export interface AnimationRefs {
  form: React.RefObject<HTMLFormElement | null>;
}

export interface AnimationControlsType {
  form: ReturnType<typeof useAnimation>;
}

export function useCreateNewOrderAnimations() {
  const refs: AnimationRefs = {
    form: useRef<HTMLFormElement>(null),
  };

  const controls: AnimationControlsType = {
    form: useAnimation(),
  };

  return { refs, controls };
}
