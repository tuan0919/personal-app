# Phân tích và kế hoạch refactor

## 1. Phân tích cấu trúc thư mục hiện tại

### Cấu trúc hiện tại:

```
src/
├── api/                  # API calls
├── components/           # Các components UI
│   ├── ActivityHistory/  # Components cho trang Activity History
│   ├── CreateNewOrder/   # Components cho trang Create New Order
│   ├── CustomerDetails/  # Components cho trang Customer Details
│   ├── EditOrder/        # Components cho trang Edit Order
│   ├── Home/             # Components cho trang Home
│   │   ├── admin/        # Components cho admin view
│   │   └── user/         # Components cho user view
│   ├── Payment/          # Components cho trang Payment
│   ├── shared/           # Shared components
│   └── ui/               # UI components từ shadcn/ui
├── context/              # React Context
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── pages/                # Page components
├── static/               # Mock data
└── utils/                # Utility functions
```

### Vấn đề:

1. **Cấu trúc thư mục chưa nhất quán**:

   - Một số file nằm trực tiếp trong `src/` như `PWABadge.tsx`
   - Phân biệt không rõ ràng giữa `lib/` và `utils/`
   - Mock data nằm trong `static/` thay vì `mocks/`

2. **Components chưa được tổ chức tối ưu**:

   - Một số components dùng chung như `ToggleThemeButton` nằm ở thư mục gốc
   - `TopNav` và `BottomNav` nằm ở thư mục gốc thay vì `shared/`
   - Một số components có thể được tái sử dụng nhưng đang nằm trong thư mục riêng

3. **Phân tách logic và UI chưa rõ ràng**:

   - Một số components chứa cả logic xử lý và UI
   - API calls và business logic đôi khi lẫn lộn

4. **Trùng lặp code**:
   - Một số components tương tự nhau giữa các trang như `CustomerCombobox` trong `EditOrder` và `CreateNewOrder`
   - Một số utility functions có thể được tái sử dụng

## 2. Kế hoạch refactor

### 2.1 Cấu trúc thư mục mới:

```
src/
├── api/                  # API calls thuần túy
├── components/           # Components UI
│   ├── features/         # Feature-specific components
│   │   ├── ActivityHistory/
│   │   ├── CreateNewOrder/
│   │   ├── CustomerDetails/
│   │   ├── EditOrder/
│   │   ├── Home/
│   │   └── Payment/
│   ├── layouts/          # Layout components
│   ├── pwa/              # PWA-related components
│   ├── shared/           # Shared components
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── dialogs/
│   │   ├── forms/
│   │   ├── navigation/
│   │   └── ...
│   └── ui/               # UI components từ shadcn/ui
├── context/              # React Context
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── mocks/                # Mock data
├── pages/                # Page components
├── services/             # Business logic
├── types/                # TypeScript types
└── utils/                # Utility functions
```

### 2.2 Kế hoạch chi tiết:

#### Cấu trúc thư mục:

- [x] Tạo cấu trúc thư mục mới theo đề xuất
- [x] Di chuyển `PWABadge.tsx` vào thư mục `components/pwa/`
- [x] Di chuyển mock data từ `static/` sang `mocks/`
- [x] Tách API calls và business logic thành `api/` và `services/`

#### Components và UI:

- [x] Di chuyển `ToggleThemeButton` vào `components/shared/`
- [x] Di chuyển `TopNav` và `BottomNav` vào `components/shared/navigation/`
- [x] Di chuyển `AuthLayout` vào `components/layouts/`
- [x] Tách các shared components từ các feature-specific components
- [x] Xác định và gộp các components trùng lặp

#### Hooks và Logic:

- [x] Tách logic từ components thành custom hooks
- [x] Tạo hook `useDeliveredCustomers` từ component `DeliveredCustomers`
- [x] Tạo hook `useFilterSheet` từ component `FilterSheet`
- [x] Tạo hook `useToggleTheme` từ component `ToggleThemeButton`
- [x] Đảm bảo các hooks được đặt tên theo feature
- [x] Tách business logic từ components vào services

#### State Management:

- [x] Global state nên dùng Context API
- [x] Tạo context cho user authentication
- [x] Tạo context cho theme management
- [x] Đảm bảo state được quản lý ở đúng cấp độ (local vs global)

#### Cleanup:

- [ ] Xóa các file không sử dụng
- [ ] Xóa code trùng lặp
- [ ] Xóa các assets không sử dụng

#### Naming Conventions:

- [ ] Đảm bảo tên file và thư mục nhất quán
- [ ] Đảm bảo tên biến và hàm có ý nghĩa và nhất quán

## 3. Checklist Refactor

### Cấu trúc thư mục

- [x] Tạo cấu trúc thư mục mới
- [x] Di chuyển `PWABadge.tsx` vào thư mục `components/pwa/`
- [x] Di chuyển mock data từ `static/` sang `mocks/`
- [x] Tách API calls và business logic thành `api/` và `services/`

### Components/UI

- [x] Di chuyển `ToggleThemeButton` vào `components/shared/`
- [x] Di chuyển `TopNav` và `BottomNav` vào `components/shared/navigation/`
- [x] Di chuyển `AuthLayout` vào `components/layouts/`
- [x] Tách các shared components từ các feature-specific components
- [x] Không có component trùng lặp giữa các trang

### Hooks & Logic

- [x] Custom hook phải nằm trong `hooks/`, không lẫn vào component
- [x] Hook chỉ dùng cho 1 feature nên đặt tên rõ ràng (`useFeatureXState`, `useFeatureXLogic`)
- [x] Không để logic xử lý phức tạp trong component, nên tách ra hook/service
- [x] Tách API calls và business logic

### State & Context

- [x] Global state nên dùng Context API
- [x] Tạo context cho user authentication
- [x] Tạo context cho theme management
- [x] Đảm bảo state được quản lý ở đúng cấp độ (local vs global)

### Cleanup

- [ ] Xóa các file không sử dụng
- [ ] Xóa code trùng lặp
- [ ] Xóa các assets không sử dụng
- [ ] Đảm bảo không có dead code

### Naming Conventions

- [ ] Tên file và thư mục nhất quán
- [ ] Tên biến và hàm có ý nghĩa và nhất quán
- [ ] Components: PascalCase
- [ ] Functions, variables: camelCase
- [ ] Constants: UPPER_SNAKE_CASE
