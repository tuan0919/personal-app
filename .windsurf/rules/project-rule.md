---
trigger: always_on
---

# Quy Tắc Tổ Chức Project

Đây là tài liệu quy định về cấu trúc thư mục và các quy tắc code được áp dụng trong project này. Việc tuân thủ các quy tắc này giúp đảm bảo code nhất quán, dễ đọc, dễ bảo trì và mở rộng.

## 1. Cấu Trúc Thư Mục `src`

Project được tổ chức theo từng "mối quan tâm" (separation of concerns). Mỗi thư mục có một vai trò và trách nhiệm riêng biệt.

```
src/
├── api/         # Logic giao tiếp với backend (services, types)
├── assets/      # Tài nguyên tĩnh (hình ảnh, fonts, icons)
├── components/  # Các React components
│   ├── common/    # Components chung, có thể tái sử dụng ở bất kỳ đâu
│   ├── ui/        # Components UI cơ bản (Button, Input, Card) - Thường là từ thư viện (shadcn)
│   └── [Feature]/ # Components thuộc về một tính năng cụ thể (e.g., Home, Order, Profile)
├── hooks/       # Các custom React Hooks
├── pages/       # Các component tương ứng với một trang (route)
├── services/    # Các services xử lý logic nghiệp vụ (e.g., authentication, payment)
├── styles/      # Global styles, CSS variables
├── types/       # Các định nghĩa TypeScript dùng chung
├── utils/       # Các hàm tiện ích
├── App.tsx      # Component gốc của ứng dụng, quản lý routing
└── main.tsx     # Điểm khởi đầu của ứng dụng
```

### **Giải Thích Chi Tiết:**

- **`api/`**: Nơi định nghĩa cách ứng dụng giao tiếp với server.

  - `services.ts`: Các hàm gọi API (e.g., `getCustomer`, `updateOrder`).
  - `types.ts`: TypeScript interfaces cho request và response. Không định nghĩa type của component ở đây.

- **`components/`**: Trái tim của UI.

  - **`common/`**: Các component có thể dùng lại ở nhiều nơi nhưng không phải là UI cơ bản. Ví dụ: `Header`, `Footer`, `Sidebar`.
  - **`ui/`**: Các component UI nguyên tử, được xây dựng trên `shadcn/ui` hoặc custom. Ví dụ: `Button.tsx`, `Input.tsx`, `Card.tsx`. Chúng không chứa logic nghiệp vụ.
  - **`[Feature]/`**: Gom nhóm các component liên quan đến một tính năng. Ví dụ: `components/Home/` sẽ chứa `DailyStats.tsx`, `OrdersList.tsx`...

- **`hooks/`**: Nơi trừu tượng hóa logic phức tạp.

  - Tên file phải bắt đầu bằng `use`, ví dụ: `useHomeState.tsx`, `useAuth.tsx`.
  - Hook không nên chứa JSX, chỉ quản lý state và logic.

- **`pages/`**: Các component được render bởi React Router.
  - Mỗi file tương ứng với một route. Ví dụ: `HomePage.tsx`, `ProfilePage.tsx`.
  - Trang chỉ nên làm nhiệm vụ "lắp ráp" các component và hooks lại với nhau, không nên chứa quá nhiều logic trực tiếp.

## 2. Quy Tắc Viết Code

### **Components**

1.  **Component phải có trách nhiệm duy nhất (Single Responsibility)**: Component chỉ nên làm một việc. Nếu một component trở nên quá lớn, hãy tách nó thành các component con.
2.  **Phân biệt Container và Presentational Components**:
    - **Container (Smart) Components**: Thường là các component trong thư mục `pages/` hoặc các component cha trong `[Feature]/`. Chúng chứa logic, gọi hooks, và quản lý state.
    - **Presentational (Dumb) Components**: Các component trong `common/` và `ui/`. Chúng chỉ nhận `props` và hiển thị giao diện, không tự quản lý state phức tạp.
3.  **Props Interface**: Mỗi component phải có một `interface` cho props, đặt ngay phía trên component. Ví dụ: `interface MyComponentProps { ... }`.

### **Hooks**

1.  **Tên Hook phải rõ ràng**: Tên hook phải thể hiện rõ chức năng của nó. Ví dụ: `useCustomerData` thay vì `useData`.
2.  **Giá trị trả về**: Hook nên trả về một object với các key được đặt tên rõ ràng, thay vì một array (trừ khi nó mô phỏng một hook gốc của React như `useState`).

    ```tsx
    // Tốt
    const { customers, isLoading, error } = useCustomerData();

    // Không tốt
    const [customers, isLoading, error] = useCustomerData();
    ```

### **Styling**

1.  **Ưu tiên Tailwind CSS**: Sử dụng utility classes của Tailwind cho hầu hết các styling.
2.  **Component `ui`**: Các component trong `components/ui` nên được style nhất quán theo `shadcn/ui`.
3.  **CSS Modules hoặc Styled Components**: Chỉ sử dụng khi có các style phức tạp không thể giải quyết bằng Tailwind.

### **Quản lý State**

1.  **State cục bộ**: Sử dụng `useState` cho state chỉ thuộc về một component.
2.  **State chia sẻ**: Sử dụng custom hooks để chia sẻ logic và state giữa các component. Nếu state cần được chia sẻ trên toàn ứng dụng, cân nhắc sử dụng `React Context` hoặc một thư viện quản lý state như `Zustand`.

## 3. Quy Tắc Đặt Tên

- **Components**: `PascalCase`. Ví dụ: `CustomerCard.tsx`.
- **Hooks**: `camelCase` với tiền tố `use`. Ví dụ: `useAuth.ts`.
- **Files & Folders**: `camelCase` hoặc `kebab-case`. Giữ sự nhất quán.
- **Types/Interfaces**: `PascalCase`. Ví dụ: `interface Customer { ... }`.
