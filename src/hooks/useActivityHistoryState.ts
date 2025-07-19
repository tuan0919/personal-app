import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { activities as mockActivities } from "@/static/mockActivityHistory";

// Số mục hiển thị ban đầu và mỗi lần load thêm
const INITIAL_ITEMS = 5;
const LOAD_MORE_ITEMS = 5;

export function useActivityHistoryState() {
  const [initialLoading, setInitialLoading] = useState(true); // Loading lần đầu
  const [loadingMore, setLoadingMore] = useState(false); // Loading khi lazy load
  const [filtering, setFiltering] = useState(false); // Loading khi filter
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [selectedTab, setSelectedTab] = useState("all");
  const allItemsLoaded = useRef(false);

  // Mô phỏng API loading - chỉ chạy 1 lần khi component mount
  useEffect(() => {
    // Simulate initial API call
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Chỉ chạy 1 lần khi component mount

  // Khi thay đổi filter, chỉ set filtering không hiện loading skeleton
  useEffect(() => {
    if (!initialLoading) {
      // Bỏ qua lần đầu load
      setFiltering(true);
      setVisibleItems(INITIAL_ITEMS); // Reset về số lượng mục ban đầu khi filter thay đổi
      allItemsLoaded.current = false;

      // Simulate quick filtering
      const timer = setTimeout(() => {
        setFiltering(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedTab, initialLoading]);

  // Lọc theo tab
  const filtered = useMemo(() => {
    let arr = mockActivities;
    if (selectedTab !== "all") arr = arr.filter((a) => a.type === selectedTab);
    return arr;
  }, [selectedTab]);

  // Mặc định sắp xếp từ mới đến cũ
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      return mockActivities.indexOf(b) - mockActivities.indexOf(a);
    });
  }, [filtered]);

  // Chỉ hiển thị số mục hiện tại
  const currentItems = useMemo(() => {
    return sorted.slice(0, visibleItems);
  }, [sorted, visibleItems]);

  // Hàm load thêm dữ liệu
  const loadMore = useCallback(() => {
    if (loadingMore || allItemsLoaded.current) return;

    setLoadingMore(true);

    // Mô phỏng thời gian tải
    setTimeout(() => {
      if (visibleItems >= sorted.length) {
        allItemsLoaded.current = true;
      } else {
        setVisibleItems((prev) =>
          Math.min(prev + LOAD_MORE_ITEMS, sorted.length)
        );
      }
      setLoadingMore(false);
    }, 800);
  }, [visibleItems, sorted.length, loadingMore]);

  // Kiểm tra xem đã load hết dữ liệu chưa
  const hasMoreItems = visibleItems < sorted.length;

  return {
    loading: initialLoading, // Sử dụng cho loading skeleton
    loadingMore, // Đang tải thêm dữ liệu
    filtering, // Có thể hiển thị loading indicator nhỏ hơn khi lọc
    selectedTab,
    setSelectedTab,
    currentItems,
    loadMore,
    hasMoreItems,
  };
}
