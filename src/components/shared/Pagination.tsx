import { motion } from "framer-motion";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { pageTransition } from "./animations";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface PaginationProps {
  /**
   * Trang hiện tại (bắt đầu từ 1)
   */
  currentPage: number;

  /**
   * Tổng số trang
   */
  totalPages: number;

  /**
   * Callback khi chuyển trang
   */
  onChange: (page: number) => void;

  /**
   * Kiểu hiển thị pagination
   * - "default": Dùng UI của shadcn với các nút điều hướng tiêu chuẩn
   * - "simple": Kiểu đơn giản chỉ có số và nút prev/next
   * - "modern": Kiểu hiện đại với hiệu ứng hover/tap và styling mới
   */
  variant?: "default" | "simple" | "modern";

  /**
   * Animation khi render component
   */
  animated?: boolean;

  /**
   * Class bổ sung
   */
  className?: string;
}

/**
 * Component phân trang dùng chung cho toàn ứng dụng
 */
export function Pagination({
  currentPage,
  totalPages,
  onChange,
  variant = "default",
  animated = true,
  className,
}: PaginationProps) {
  // Xử lý chuyển trang
  const handlePrevious = () => onChange(Math.max(1, currentPage - 1));
  const handleNext = () => onChange(Math.min(totalPages, currentPage + 1));
  const handlePageClick = (page: number) => onChange(page);

  // Điều kiện disabled
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  // Modern variant (custom styling từ Payment pagination)
  if (variant === "modern") {
    const Container = animated ? motion.div : "div";
    const ButtonWrapper = animated ? motion.button : "button";

    return (
      <Container
        className={cn("flex justify-center items-center space-x-2", className)}
        {...(animated && {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
        })}
      >
        <button
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors"
        >
          <FiChevronLeft className="text-gray-600" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <ButtonWrapper
            key={page}
            onClick={() => handlePageClick(page)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              currentPage === page
                ? "bg-pink-500 text-white shadow-lg"
                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-pink-50 border border-gray-200"
            )}
            {...(animated && {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
            })}
          >
            {page}
          </ButtonWrapper>
        ))}

        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors"
        >
          <FiChevronRight className="text-gray-600" />
        </button>
      </Container>
    );
  }

  // Simple variant (simplified version)
  if (variant === "simple") {
    const Container = animated ? motion.div : "div";

    return (
      <Container
        className={cn("flex justify-center items-center gap-4", className)}
        {...(animated && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.2 },
        })}
      >
        <button
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 disabled:opacity-40"
        >
          <FiChevronLeft size={16} />
        </button>

        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 disabled:opacity-40"
        >
          <FiChevronRight size={16} />
        </button>
      </Container>
    );
  }

  // Default variant (shadcn-based pagination như CustomPagination/OrdersPagination)
  const Wrapper = animated ? motion.div : "div";

  return (
    <Wrapper
      className={cn("flex justify-center", className)}
      {...(animated && {
        variants: pageTransition,
        initial: "initial",
        animate: "animate",
      })}
    >
      <ShadcnPagination>
        <PaginationContent>
          <PaginationItem>
            <motion.div
              whileHover={{ scale: !isPreviousDisabled ? 1.05 : 1 }}
              whileTap={{ scale: !isPreviousDisabled ? 0.95 : 1 }}
            >
              <PaginationPrevious
                onClick={handlePrevious}
                aria-disabled={isPreviousDisabled}
                className={cn(
                  isPreviousDisabled && "pointer-events-none opacity-50"
                )}
              />
            </motion.div>
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageClick(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </motion.div>
            </PaginationItem>
          ))}

          <PaginationItem>
            <motion.div
              whileHover={{ scale: !isNextDisabled ? 1.05 : 1 }}
              whileTap={{ scale: !isNextDisabled ? 0.95 : 1 }}
            >
              <PaginationNext
                onClick={handleNext}
                aria-disabled={isNextDisabled}
                className={cn(
                  isNextDisabled && "pointer-events-none opacity-50"
                )}
              />
            </motion.div>
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </Wrapper>
  );
}
