export type ActivityHistory = {
  type: "add" | "edit" | "confirm" | "cancel";
  title: string;
  time: string;
};

export const activities: ActivityHistory[] = [
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Nguyễn Văn An",
    time: "2 ngày trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Trần Thị Bình",
    time: "1 tuần trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Lê Văn Cường",
    time: "2 tuần trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Phạm Thị Dung",
    time: "3 tuần trước",
  },
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Hoàng Văn Em",
    time: "4 ngày trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Vũ Thị Phượng",
    time: "5 ngày trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Nguyễn Văn An",
    time: "6 ngày trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Trần Thị Bình",
    time: "1 tháng trước",
  },
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Lê Văn Cường",
    time: "2 tháng trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Phạm Thị Dung",
    time: "3 tháng trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Hoàng Văn Em",
    time: "4 tháng trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Vũ Thị Phượng",
    time: "5 tháng trước",
  },
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Trần Thị Bình",
    time: "6 tháng trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Nguyễn Văn An",
    time: "7 tháng trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Phạm Thị Dung",
    time: "8 tháng trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Hoàng Văn Em",
    time: "9 tháng trước",
  },
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Vũ Thị Phượng",
    time: "10 tháng trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Lê Văn Cường",
    time: "11 tháng trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Trần Thị Bình",
    time: "12 tháng trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Nguyễn Văn An",
    time: "13 tháng trước",
  },
  // Thêm 10 hoạt động mới
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Đỗ Văn Hùng",
    time: "14 tháng trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Lý Thị Mai",
    time: "15 tháng trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Trịnh Văn Nam",
    time: "16 tháng trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Đặng Thị Oanh",
    time: "17 tháng trước",
  },
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Bùi Văn Phúc",
    time: "18 tháng trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Hồ Thị Quỳnh",
    time: "19 tháng trước",
  },
  {
    type: "confirm",
    title: "Bạn đã xác nhận thu tiền đơn hàng của Võ Văn Sinh",
    time: "20 tháng trước",
  },
  {
    type: "cancel",
    title: "Bạn đã hủy xác nhận thu tiền đơn hàng của Ngô Thị Tuyết",
    time: "21 tháng trước",
  },
  {
    type: "add",
    title: "Bạn đã thêm đơn hàng mới cho khách hàng Huỳnh Văn Uyên",
    time: "22 tháng trước",
  },
  {
    type: "edit",
    title: "Bạn đã sửa đơn hàng của khách hàng Trương Thị Vân",
    time: "23 tháng trước",
  },
];
