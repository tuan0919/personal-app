import { useState, useEffect } from "react";
import { Customer } from "@/api/types";
import { useNavigate } from "react-router-dom";

interface UseDeliveredCustomersProps {
  delivered: Customer[];
  onDeleteCustomer: (customerId: number) => Promise<void>;
  loading?: boolean;
}

export function useDeliveredCustomers({
  delivered,
  onDeleteCustomer,
  loading = false,
}: UseDeliveredCustomersProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Cập nhật trạng thái loading khi prop loading thay đổi
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // đảm bảo chỉ xài những đơn đã giao
  const deliveredList = delivered.filter((c) => c.delivered);

  const perPage = 3;
  const totalPages = Math.max(1, Math.ceil(deliveredList.length / perPage));

  // nếu deliveredList thay đổi mà page vượt quá, reset về 1
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const startIdx = (page - 1) * perPage;
  const currentItems = deliveredList.slice(startIdx, startIdx + perPage);

  const handleCustomerSelect = (customer: Customer) => {
    if (selectedCustomer?.customerId === customer.customerId) {
      // Deselect: CHỈ tắt popup, không clear selectedCustomer ngay
      setShowActionPopup(false);
      // selectedCustomer sẽ được clear sau khi animation hoàn tất
    } else {
      // Select new customer
      setSelectedCustomer(customer);
      setShowActionPopup(true);
    }
  };

  const handleClosePopup = () => {
    // CHỈ tắt popup, không clear selectedCustomer ngay
    setShowActionPopup(false);
    // selectedCustomer sẽ được clear sau khi animation hoàn tất
  };

  // Callback khi animation exit hoàn tất
  const handleAnimationComplete = () => {
    if (!showActionPopup) {
      // Chỉ clear selectedCustomer sau khi animation exit hoàn tất
      setSelectedCustomer(null);
    }
  };

  const handleView = (customer: Customer) => {
    console.log("View customer:", customer);
    setShowActionPopup(false);
  };

  const handleEdit = (customer: Customer) => {
    setShowActionPopup(false);
    navigate(
      { pathname: `/order/${customer.customerId}/edit` },
      {
        state: customer,
      }
    );
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setShowActionPopup(false);
  };

  const confirmDelete = async () => {
    if (selectedCustomer) {
      try {
        await onDeleteCustomer(selectedCustomer.customerId);
        setSelectedCustomer(null);
        setShowDeleteConfirm(false);
      } catch (error) {
        console.error("Failed to delete customer:", error);
        // You could add error handling UI here
      }
    }
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };

  const setLoadingState = (loading: boolean) => {
    setIsLoading(loading);
  };

  return {
    // State
    selectedCustomer,
    showActionPopup,
    showDeleteConfirm,
    isLoading,
    page,
    totalPages,
    currentItems,
    deliveredList,

    // Actions
    setPage,
    handleCustomerSelect,
    handleClosePopup,
    handleAnimationComplete,
    handleView,
    handleEdit,
    handleDelete,
    confirmDelete,
    closeDeleteConfirm,
    setLoadingState,
  };
}
