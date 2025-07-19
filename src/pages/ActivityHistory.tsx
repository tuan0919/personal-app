import { motion, AnimatePresence } from "framer-motion";
import AttendNavbar from "@/components/CreateNewOrder/AttendNavbar";
import {
  FaPlus,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import { TabSlider } from "@/components/ActivityHistory/TabSlider";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { containerVariants } from "@/components/shared/animations";
import { useActivityHistoryState } from "@/hooks/useActivityHistoryState";
import { useActivityHistoryAnimations } from "@/hooks/useActivityHistoryAnimations";
import { useEffect, useRef, useCallback } from "react";

const ICON_MAP = {
  add: <FaPlus className="text-green-500 w-4 h-4" />,
  edit: <FaEdit className="text-blue-500 w-4 h-4" />,
  confirm: <FaCheckCircle className="text-pink-500 w-4 h-4" />,
  cancel: <FaTimesCircle className="text-red-500 w-4 h-4" />,
};

const TABS = [
  { key: "all", label: "Tất cả" },
  { key: "add", icon: ICON_MAP.add, label: "Thêm đơn" },
  { key: "edit", icon: ICON_MAP.edit, label: "Sửa đơn" },
  { key: "confirm", icon: ICON_MAP.confirm, label: "Xác nhận thu" },
  { key: "cancel", icon: ICON_MAP.cancel, label: "Hủy xác nhận" },
];

export default function ActivityHistory() {
  const {
    loading,
    loadingMore,
    filtering,
    selectedTab,
    setSelectedTab,
    currentItems,
    loadMore,
    hasMoreItems,
  } = useActivityHistoryState();

  const { refs, controls, restartContentAnimation } =
    useActivityHistoryAnimations();

  // Ref để theo dõi phần tử cuối cùng
  const observerTarget = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const initialLoadDone = useRef(false);

  // Callback cho Intersection Observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      console.log(
        "Observer triggered:",
        entry.isIntersecting,
        "loadingMore:",
        loadingMore,
        "hasMoreItems:",
        hasMoreItems
      );
      if (entry.isIntersecting && !loadingMore && hasMoreItems) {
        console.log("Loading more items...");
        loadMore();
      }
    },
    [loadingMore, hasMoreItems, loadMore]
  );

  // Thiết lập Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px", // Tăng margin để trigger sớm hơn
      threshold: 0.1,
    };

    // Tạo observer mới
    observerRef.current = new IntersectionObserver(handleObserver, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Observe target khi nó có sẵn và khi currentItems thay đổi
  useEffect(() => {
    if (observerRef.current && observerTarget.current && hasMoreItems) {
      observerRef.current.observe(observerTarget.current);
      console.log("Observer attached to target");
    }

    return () => {
      if (observerRef.current && observerTarget.current) {
        observerRef.current.unobserve(observerTarget.current);
      }
    };
  }, [currentItems, hasMoreItems]);

  // Tự động load thêm khi component mount và có đủ dữ liệu
  useEffect(() => {
    if (!loading && !initialLoadDone.current && hasMoreItems && !loadingMore) {
      // Delay một chút để đảm bảo DOM đã render
      const timer = setTimeout(() => {
        console.log("Auto loading more on initial mount...");
        loadMore();
        initialLoadDone.current = true;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, hasMoreItems, loadingMore, loadMore]);

  // Reset initialLoadDone khi filter thay đổi
  useEffect(() => {
    initialLoadDone.current = false;
  }, [selectedTab]);

  // Theo dõi thay đổi của filter và kích hoạt lại animation
  useEffect(() => {
    if (!loading) {
      restartContentAnimation();
    }
  }, [selectedTab, loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingSkeleton
          key="loading"
          loading={loading}
          pageName="Lịch sử hoạt động"
        />
      ) : (
        <div
          className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]"
          key="content"
        >
          <AttendNavbar />
          <motion.main
            className="flex-1 overflow-y-auto px-2 pt-4 pb-24 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.section
              className="bg-white/70 rounded-2xl shadow p-3 sm:p-6 mb-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-pink-600 text-center flex-1">
                  Lịch sử hoạt động
                </h2>
                {filtering && (
                  <div className="flex items-center mr-2">
                    <FaSpinner className="animate-spin text-pink-500 mr-1" />
                    <span className="text-xs text-pink-500">Đang lọc...</span>
                  </div>
                )}
              </div>

              {/* Tabs slider */}
              <TabSlider
                tabs={TABS}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  ref={refs.content}
                  animate={controls.content}
                  initial={{ opacity: 0, y: 30 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col gap-3 ${
                    filtering ? "opacity-50" : ""
                  }`}
                >
                  {currentItems.length === 0 ? (
                    <div className="text-center p-8 text-gray-500">
                      Không có hoạt động nào phù hợp với bộ lọc
                    </div>
                  ) : (
                    <>
                      {/* Danh sách hoạt động */}
                      {currentItems.map((activity, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-4 bg-gradient-to-r from-pink-50/80 to-orange-50/80 rounded-xl px-5 py-3 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                          <div className="flex-shrink-0 p-3 border-2 border-pink-200 bg-white/80 rounded-full flex items-center justify-center">
                            {ICON_MAP[activity.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-800 text-sm truncate">
                              {activity.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {activity.time}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Loading indicator & observer target */}
                      <div
                        ref={observerTarget}
                        className={`text-center py-4 ${
                          !hasMoreItems ? "hidden" : ""
                        }`}
                      >
                        {loadingMore && (
                          <div className="flex justify-center items-center gap-2">
                            <FaSpinner className="animate-spin text-pink-500" />
                            <span className="text-sm text-gray-500">
                              Đang tải thêm...
                            </span>
                          </div>
                        )}
                      </div>

                      {/* "Đã hiển thị hết" message */}
                      {!hasMoreItems && currentItems.length > 0 && (
                        <div className="text-center py-4 text-sm text-gray-400">
                          Đã hiển thị tất cả hoạt động
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.section>
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
}
