# Personal App - Ứng dụng Quản lý Đơn hàng

Ứng dụng web hiện đại được xây dựng để quản lý đơn hàng và khách hàng với giao diện thân thiện và trải nghiệm người dùng tối ưu.

## 🎯 Mục đích của Project

Personal App là một ứng dụng quản lý đơn hàng được thiết kế đặc biệt cho các doanh nghiệp nhỏ và vừa trong lĩnh vực bán hàng và giao hàng. Ứng dụng giúp theo dõi, quản lý và xử lý các đơn hàng một cách hiệu quả với giao diện trực quan và dễ sử dụng.

## ✨ Tính năng chính

### 📱 **Giao diện Responsive & PWA**

- Thiết kế mobile-first, hoạt động mượt mà trên mọi thiết bị
- Progressive Web App (PWA) - có thể cài đặt như ứng dụng native
- Hoạt động offline với service worker
- Giao diện hiện đại với animations mượt mà

### 🏠 **Trang chủ thông minh**

- **Chế độ User**: Hiển thị danh sách khách hàng đã giao hàng, nút tạo đơn hàng mới
- **Chế độ Admin**: Dashboard với thống kê, biểu đồ doanh thu, quản lý đơn hàng
- Phân trang thông minh với animations
- Floating action buttons với popup actions

### 📋 **Quản lý đơn hàng**

- **Tạo đơn hàng mới**: Form validation, chọn khách hàng, loại sản phẩm, số lượng
- **Chỉnh sửa đơn hàng**: Cập nhật thông tin với dialog xác nhận
- **Xem chi tiết khách hàng**: Thông tin cá nhân, lịch sử giao hàng, biểu đồ doanh thu
- **Bản đồ tương tác**: Hiển thị vị trí khách hàng với React Leaflet

### 💰 **Quản lý thanh toán**

- Danh sách đơn hàng chờ thanh toán
- Xác nhận/hủy thanh toán với dialog xác nhận
- Thống kê thanh toán theo ngày/tuần/tháng
- Phân trang và tìm kiếm đơn hàng

### 📊 **Thống kê & Báo cáo**

- **Biểu đồ doanh thu**: Weekly revenue chart với Recharts
- **Thống kê hàng ngày**: Số đơn hàng, doanh thu, khách hàng mới
- **Thống kê hàng tuần**: So sánh với tuần trước
- **Calendar view**: Chọn ngày để xem thống kê

### 📈 **Lịch sử hoạt động**

- Theo dõi tất cả hoạt động: thêm, sửa đơn hàng, xác nhận/hủy thanh toán
- **Bộ lọc thông minh**: Theo tháng, loại hoạt động
- **Sắp xếp**: Mới nhất/cũ nhất
- **Tab slider**: Phân loại hoạt động với icons
- **Pagination**: Phân trang với animations

### 🎨 **UI/UX đặc biệt**

- **Animations mượt mà**: Sử dụng Framer Motion
- **Dark/Light theme**: Chuyển đổi theme với toggle button
- **Loading states**: Skeleton loading cho trải nghiệm tốt hơn
- **Micro-interactions**: Hover effects, transitions
- **Accessibility**: Hỗ trợ keyboard navigation

## 🛠️ Công nghệ sử dụng

### **Frontend Framework**

- **React 19** - Framework chính với TypeScript
- **Vite** - Build tool nhanh và hiệu quả
- **React Router DOM** - Client-side routing

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library hiện đại
- **Framer Motion** - Animation library
- **React Icons** - Icon library đa dạng

### **Data & Forms**

- **React Hook Form** - Form handling hiệu quả
- **Zod** - Schema validation
- **Recharts** - Chart library cho biểu đồ

### **Maps & Calendar**

- **React Leaflet** - Interactive maps
- **React Day Picker** - Calendar components
- **Date-fns** - Date manipulation

### **PWA & Performance**

- **Vite PWA Plugin** - Progressive Web App
- **Workbox** - Service worker management
- **Code splitting** - Tối ưu bundle size

## 📁 Cấu trúc Project

```
src/
├── components/              # Components tái sử dụng
│   ├── ui/                 # shadcn/ui components
│   ├── Home/               # Components trang chủ
│   │   ├── admin/         # Dashboard admin
│   │   └── user/          # Giao diện user
│   ├── Payment/           # Quản lý thanh toán
│   ├── CustomerDetails/   # Chi tiết khách hàng
│   ├── CreateNewOrder/    # Tạo đơn hàng mới
│   ├── EditOrder/         # Chỉnh sửa đơn hàng
│   └── ActivityHistory/   # Lịch sử hoạt động
├── pages/                 # Các trang chính
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── static/                # Mock data
├── lib/                   # Library configs
└── assets/                # Static assets
```

## 🚀 Cách sử dụng

### Yêu cầu hệ thống

- Node.js 18.0.0 trở lên
- npm 8.0.0 trở lên

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd personal-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview production build
- `npm run lint` - Kiểm tra code style
- `npm run type-check` - Kiểm tra TypeScript

## 🌐 Deployment

### Deploy lên Vercel (Khuyến nghị)

1. Push code lên GitHub
2. Connect repository với Vercel
3. Vercel sẽ tự động detect và deploy
4. Ứng dụng sẽ có URL dạng: `https://your-app.vercel.app`

### Deploy thủ công

```bash
npm run build
# Upload thư mục dist/ lên hosting provider
```

## 📱 Tính năng PWA

- **Installable**: Có thể cài đặt như app native
- **Offline support**: Hoạt động khi không có internet
- **Background sync**: Đồng bộ dữ liệu khi có kết nối
- **Push notifications**: (Có thể mở rộng trong tương lai)

## 🎨 Theme & Customization

Ứng dụng hỗ trợ:

- **Light theme**: Giao diện sáng, dễ đọc
- **Dark theme**: Giao diện tối, bảo vệ mắt
- **Responsive design**: Tự động điều chỉnh theo kích thước màn hình
- **Custom animations**: Hiệu ứng chuyển đổi mượt mà

## 🔧 Tính năng đặc biệt

### **Smart Pagination**

- Phân trang với animations
- Tự động reset về trang 1 khi filter thay đổi
- Loading states mượt mà

### **Advanced Filtering**

- Filter theo tháng với calendar picker
- Sort ascending/descending
- Tab slider với icons cho loại hoạt động

### **Real-time Updates**

- Form validation real-time
- Price calculation tự động
- Responsive UI updates

### **Data Visualization**

- Biểu đồ doanh thu tương tác
- Thống kê với animations
- Calendar view cho dữ liệu

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Project này được phát hành dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

Nếu có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng tạo issue trên GitHub repository.

---

**Personal App** - Giải pháp quản lý đơn hàng hiện đại cho doanh nghiệp của bạn! 🚀
