// /hooks/useHomeAnimations.ts
import { useRef, useEffect, RefObject } from "react";
import { useAnimation, useInView } from "framer-motion";

function useInViewAnimation(ref: RefObject<Element | null>) {
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, margin: "-65px 0px" });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  return controls;
}

export function useHomeAnimations() {
  const dailyStatsRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const weeklyStatsRef = useRef<HTMLDivElement>(null);

  const dailyStatsCtrl = useInViewAnimation(dailyStatsRef);
  const ordersCtrl = useInViewAnimation(ordersRef);
  const chartCtrl = useInViewAnimation(chartRef);
  const weeklyStatsCtrl = useInViewAnimation(weeklyStatsRef);

  return {
    refs: {
      dailyStatsRef,
      ordersRef,
      chartRef,
      weeklyStatsRef,
    },
    controls: {
      dailyStatsCtrl,
      ordersCtrl,
      chartCtrl,
      weeklyStatsCtrl,
    },
  };
}
