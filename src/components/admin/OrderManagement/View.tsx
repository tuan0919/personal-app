import { motion } from "framer-motion";
import { DailyStatsSection, OrderSection } from ".";

export function View() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <DailyStatsSection />
      <OrderSection />
    </motion.div>
  );
}
