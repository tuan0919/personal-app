# Kế hoạch Refactor Dự án React/Next.js

## 1. Phân tích tổng quan cấu trúc hiện tại

### Ưu điểm

- Đã có phân chia khá rõ ràng giữa các mảng: `components`, `hooks`, `api`, `context`, `services`, `utils`, `constants`, `types`, `assets`.
- Có thư mục `pages` và `layouts` tách biệt, phù hợp với các project React/Next.js hiện đại.
- Có tách biệt file style (`index.css`, `PWABadge.css`), assets, và các file cấu hình.

### Những điểm có thể bất hợp lý/đáng chú ý

- **Thư mục `routes`**: Nếu dùng Next.js, routes nên nằm trong `pages` hoặc `app` (Next 13+). Nếu là React Vite/SPA, nên làm rõ vai trò của `routes` (có thể là custom route config).
- **Thư mục `services` và `api`**: Dễ bị trùng lặp vai trò. Thường chỉ cần 1 trong 2: `api` (gọi API) hoặc `services` (xử lý logic phức tạp, gọi API, xử lý dữ liệu). Nếu tách, cần quy ước rõ ràng.
- **Thư mục `constants` và `types`**: Tốt, nhưng cần đảm bảo không bị lẫn lộn (ví dụ: constant liên quan đến API nên để gần API).
- **Thư mục `static`**: Nếu chỉ chứa mock data, nên đổi tên thành `mocks` hoặc `__mocks__` cho rõ nghĩa.
- **File lẻ trong `src`**: Có các file như `PWABadge.tsx`, `PWABadge.css`, `App.tsx`, `main.tsx`. Nếu các file này là global entry hoặc global component thì hợp lý, còn lại nên đưa vào đúng thư mục.
- **Thư mục `layouts`**: Nếu chỉ có 1-2 layout, có thể để trong `components/shared` hoặc `components/layouts`. Nếu nhiều layout, nên giữ nguyên.
- **Thư mục `lib` và `utils`**: Dễ bị trùng vai trò. `lib` thường chứa thư viện tự viết hoặc wrapper, còn `utils` là các hàm tiện ích nhỏ. Nên làm rõ ranh giới.
- **Thư mục `assets`**: Đúng chuẩn, chứa hình ảnh, SVG, v.v.

### Dấu hiệu code smell/duplicate/hardcode (dựa trên cấu trúc)

- Có thể có duplicate giữa `services` và `api`, hoặc giữa `lib` và `utils`.
- Nếu có nhiều file lẻ trong `src`, dễ bị hardcode hoặc khó maintain.
- Nếu các file như `PWABadge.tsx` chỉ dùng cho 1 page, nên đưa vào đúng page/component.

---

## 2. Gợi ý cấu trúc chuẩn & kế hoạch refactor tổng thể

### Cấu trúc chuẩn đề xuất

```
src/
  assets/           # Ảnh, SVG, font, v.v.
  components/
    shared/         # Component dùng chung (Button, Modal, ...)
    [Feature]/      # Component theo tính năng/page
    layouts/        # Layout components (nếu nhiều layout)
  hooks/            # Custom hooks
  context/          # React context
  api/              # Gọi API, axios/fetch, schema, types liên quan API
  services/         # Business logic, xử lý phức tạp, gọi api, cache, v.v.
  constants/        # Biến constant, enums, v.v.
  types/            # TypeScript types/interfaces (global)
  utils/            # Hàm tiện ích nhỏ, pure function
  lib/              # Wrapper thư viện, custom logic lớn (nếu có)
  pages/            # Page components (Next.js hoặc SPA)
  routes/           # Route config (nếu không dùng Next.js)
  mocks/            # Mock data (đổi từ static/ nếu chỉ chứa mock data)
  styles/           # (Nếu có nhiều file css/scss)
  App.tsx           # Entry point
  main.tsx          # Entry point
  index.css         # Global style
```

### Những phần nên tách/gộp/xóa/đổi tên

- **Tách**: Nếu `services` và `api` đang lẫn lộn, nên tách rõ: `api` chỉ gọi API, `services` xử lý logic.
- **Gộp**: Nếu `lib` và `utils` trùng vai trò, nên gộp lại thành `utils/`.
- **Đổi tên**: `static` → `mocks` nếu chỉ chứa mock data.
- **Xóa**: File lẻ không dùng hoặc duplicate.
- **Đổi vị trí**: Component chỉ dùng cho 1 page nên để trong thư mục page đó.

---

## 3. Checklist refactor cụ thể

### 📁 Cấu trúc thư mục

- [x] Rà soát lại vai trò `services` vs `api`, tách/gộp hợp lý.
  - **Kết quả**: Thư mục `services` hiện đang trống, trong khi `api` chứa cả API calls và mock data. Cần chuyển logic xử lý dữ liệu từ `api/customerService.ts` sang `services/`.
  - **Đã thực hiện**: Đã tạo file `services/customerService.ts` để xử lý logic business, và cập nhật `api/customerService.ts` để chỉ chứa API calls.
- [x] Đổi tên `static` thành `mocks` nếu chỉ chứa mock data.
  - **Kết quả**: Thư mục `static` chỉ chứa các file mock data (mockCustomers.ts, mockActivityHistory.ts, mockPayment.ts, mockCustomerDetails.ts). Cần đổi tên thành `mocks`.
  - **Đã thực hiện**: Đã tạo thư mục `mocks` và di chuyển tất cả mock data từ `static` sang `mocks`.
- [x] Gộp `lib` và `utils` nếu trùng vai trò.
  - **Kết quả**: `lib` chứa utility function `cn()` cho Tailwind CSS, còn `utils` chứa các hàm formatter. Hai thư mục có vai trò khác nhau, không cần gộp, nhưng cần làm rõ ranh giới giữa chúng.
  - **Đã thực hiện**: Đã xác định ranh giới giữa hai thư mục, không cần gộp.
- [x] Đảm bảo các file lẻ (`PWABadge.tsx`, ...) nằm đúng thư mục (shared/component/page).
  - **Kết quả**: `PWABadge.tsx` là một component global cho PWA, nên chuyển vào `components/shared` hoặc tạo thư mục `components/pwa`.
  - **Đã thực hiện**: Đã tạo thư mục `components/pwa` và di chuyển `PWABadge.tsx` và `PWABadge.css` vào đó.
- [x] Đảm bảo các layout component nằm trong `components/layouts` hoặc `components/shared`.
  - **Kết quả**: Thư mục `layouts` hiện đang trống, nhưng có `AuthLayout.tsx` trong `components/shared`. Cần chuyển layout components vào thư mục thống nhất.
  - **Đã thực hiện**: Đã tạo thư mục `components/layouts` và di chuyển `AuthLayout.tsx` từ `components/shared` sang `components/layouts`.

### 🧩 Component & UI

- [ ] Đảm bảo component chia theo feature/page, không để component lớn trong `shared` nếu chỉ dùng cho 1 page.
- [ ] Đảm bảo các UI component dùng chung nằm trong `shared/` hoặc `ui/`.
- [ ] Đảm bảo không có duplicate component giữa các page.

### 🔁 Hooks & logic

- [ ] Custom hook phải nằm trong `hooks/`, không lẫn vào component.
- [ ] Hook chỉ dùng cho 1 feature nên đặt tên rõ ràng (`useFeatureXState`, `useFeatureXLogic`).
- [ ] Không để logic xử lý phức tạp trong component, nên tách ra hook/service.

### 🌐 API & services

- [x] Hàm gọi API phải nằm trong `api/`, không lẫn vào component/hook.
  - **Đã thực hiện**: Đã cập nhật `api/customerService.ts` để chỉ chứa các API calls.
- [x] Logic xử lý dữ liệu, mapping, cache nên nằm trong `services/`.
  - **Đã thực hiện**: Đã tạo `services/customerService.ts` để chứa logic xử lý dữ liệu.
- [x] Đảm bảo không duplicate logic giữa `api` và `services`.
  - **Đã thực hiện**: Đã phân tách rõ ràng vai trò giữa `api` (gọi API) và `services` (xử lý logic).

### 📦 State & Context

- [ ] Context global nên nằm trong `context/`.
- [ ] State local nên dùng hook, không dùng context nếu không cần thiết.
- [ ] Đảm bảo context không bị lẫn với logic business.

### 🧹 Dọn dẹp file/code thừa

- [ ] Xóa file không dùng, file duplicate, file test cũ.
- [ ] Xóa/comment code không còn sử dụng.
- [ ] Dọn dẹp assets không dùng.

### 📖 Đặt tên lại (file, biến, hàm)

- [ ] Đặt lại tên file cho đúng vai trò (component PascalCase, hook camelCase, ...).
- [ ] Đặt lại tên biến/hàm cho rõ nghĩa, không viết tắt khó hiểu.
- [ ] Đảm bảo tên folder/file đồng nhất (ví dụ: `CustomerDetails` vs `customer-details`).

---

**Lưu ý:**

- Chỉ lập kế hoạch và checklist, chưa thực hiện refactor ngay.
- Sẽ bổ sung checklist chi tiết hơn khi phân tích từng phần mã nguồn cụ thể.
