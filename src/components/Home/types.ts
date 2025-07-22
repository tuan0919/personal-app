// Shared types for Home components

// Base props that both UserView and AdminView share
export interface BaseViewProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

// Type for framer-motion animation controls
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FramerControls = any;

// Animation refs and controls for complex animations
export interface AnimationProps {
  refs?: {
    dailyStatsRef?: React.RefObject<HTMLDivElement | null>;
    ordersRef?: React.RefObject<HTMLDivElement | null>;
    chartRef?: React.RefObject<HTMLDivElement | null>;
    weeklyStatsRef?: React.RefObject<HTMLDivElement | null>;
  };
  controls?: {
    dailyStatsCtrl?: FramerControls;
    ordersCtrl?: FramerControls;
    chartCtrl?: FramerControls;
    weeklyStatsCtrl?: FramerControls;
  };
}
