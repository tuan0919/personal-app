---
trigger: always_on
---

# Components

- Component dùng cho một trang sẽ có một folder riêng

  - Chẳng hạn, trang Home thì các component cấu thành nên trang đó sẽ nằm trong folder @/components/Home/...

- Component dùng chung thì sẽ nằm trong folder @/components/shared/...

## Nội dung Component

Nội dung bên trong một component chỉ nên chứa các logic liên quan đến render dữ liệu lên trên giao diện người dùng, còn các logic liên quan đến tương tác API thì dùng qua custom hooks.
