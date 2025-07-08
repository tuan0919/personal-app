// /components/Home/OrdersSection.tsx
import { forwardRef, useEffect } from "react";
import { motion, LegacyAnimationControls } from "framer-motion";
import { CalendarChooser } from "./CalendarChooser";
import { OrderItem } from "./OrderItem";
import { OrdersPagination } from "./OrdersPagination";
import { slideInVariants } from "@/components/Home/animations";
import { useOrdersLogic } from "@/hooks/useOrders";

interface OrdersSectionProps {
  controls: LegacyAnimationControls;
}

export const OrdersSection = forwardRef<HTMLDivElement, OrdersSectionProps>(
  ({ controls }, ref) => {
    const {
      selectedDate,
      setSelectedDate,
      currentPage,
      setCurrentPage,
      selectedRecord,
      setSelectedRecord,
      paged,
      totalPages,
      handleView,
      handleEdit,
      handleDelete,
    } = useOrdersLogic();

    // Replay animation when date/page changes
    useEffect(() => {
      controls.set("hidden");
      controls.start("visible");
    }, [currentPage, selectedDate, controls]);

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={slideInVariants}
        className="mb-4"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
            Đơn giao đá hôm nay
          </h2>
          <CalendarChooser
            date={selectedDate}
            onChange={(d) => {
              setSelectedDate(d);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-2 max-h-72 overflow-y-auto">
          {paged.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-6">
              Không có đơn giao nào trong ngày này.
            </div>
          ) : (
            paged.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                selected={selectedRecord === order.id}
                onSelect={() =>
                  setSelectedRecord((r) => (r === order.id ? null : order.id))
                }
                onView={() => handleView(order.id)}
                onEdit={() => handleEdit(order.id)}
                onDelete={() => handleDelete(order.id)}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <OrdersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </motion.section>
    );
  }
);

OrdersSection.displayName = "OrdersSection";
