// /hooks/useOrdersLogic.ts
import { useState } from "react";
import { format } from "date-fns";
import { allOrders } from "@/static/mock-data";

export function useOrdersLogic() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const ordersPerPage = 4;

  // Filter & paginate
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const ordersToday = allOrders.filter((o) => o.date === dateStr);
  const totalPages = Math.max(1, Math.ceil(ordersToday.length / ordersPerPage));
  const paged = ordersToday.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  function handleView(id: number) {
    console.log("Xem chi tiết", id);
  }

  function handleEdit(id: number) {
    console.log("Sửa đơn", id);
  }

  function handleDelete(id: number) {
    console.log("Xóa đơn", id);
  }

  return {
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
  };
}
