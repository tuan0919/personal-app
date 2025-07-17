const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN") + "đ";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export { formatCurrency, formatDate };
