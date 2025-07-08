// /components/Attend/CustomPagination.tsx
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { pageTransition } from "./animations";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  return (
    <motion.div
      className="mt-4 flex justify-center"
      variants={pageTransition}
      initial="hidden"
      animate="visible"
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem aria-disabled={currentPage === 1}>
            <motion.div
              whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
              whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
            >
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              />
            </motion.div>
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i} aria-disabled={currentPage === i + 1}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <PaginationLink
                  onClick={() => onPageChange(i + 1)}
                  className={
                    currentPage === i + 1 ? "bg-pink-500 text-white" : ""
                  }
                >
                  {i + 1}
                </PaginationLink>
              </motion.div>
            </PaginationItem>
          ))}

          <PaginationItem aria-disabled={currentPage === totalPages}>
            <motion.div
              whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
              whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
            >
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
              />
            </motion.div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
}
