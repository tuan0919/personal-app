---
trigger: always_on
---

# UI Style Guide - Học Từ Trang Hiện Có

## Nguyên Tắc Thiết Kế Tổng Quát

1. **Phân tích style hiện tại** trước khi tạo component mới
2. **Tham khảo các trang đã có** trong project để maintain consistency
3. **Sử dụng design tokens** từ existing components
4. **Follow responsive patterns** đã được implement

## Style Detection Rules

### Colors & Theming

- Quan sát **color palette** từ existing pages
- Extract **gradient patterns** đang được sử dụng
- Identify **accent colors** cho different states
- Match **background styles** với current theme

### Component Patterns

- **Card layouts**: Copy spacing, shadows, borders từ existing cards
- **Button styles**: Match current button designs và states
- **Typography**: Follow font sizes, weights, colors đã set
- **Icon usage**: Consistent với react-icons library hiện tại

## Technology Stack Adherence

1. **Tailwind CSS**: Sử dụng utility classes như existing code
2. **shadcn UI**: Prioritize shadcn components over custom builds
3. **React hooks**: Implement animations với hooks pattern[1]
4. **TypeScript**: Maintain type safety và component structure[1]

## Responsive Design Patterns

- **Mobile-first approach**: iPhone SE optimization như đã làm[2]
- **Breakpoint consistency**: Follow existing responsive breakpoints
- **Touch targets**: Match current mobile interaction patterns
- **Layout grids**: Use same grid system across pages

## Code Organization

- **Modular components**: Break down như pattern hiện tại[1]
- **Reusable patterns**: Extract common UI elements
- **Clean folder structure**: Follow existing organization[1]
- **Component composition**: Build complex UI từ smaller pieces

## Analysis Workflow

1. **Scan existing pages** trong project trước khi code
2. **Identify common patterns** và design tokens
3. **Extract reusable styles** thành utility classes
4. **Maintain visual hierarchy** đã established

## Implementation Guidelines

- **Before creating new component**: Review 2-3 similar existing components
- **Extract shared styles**: Create utility classes for common patterns
- **Test consistency**: Compare new component với existing UI
- **Document variations**: Note any intentional style differences

## Dynamic Style Adaptation

1. Automatically **inherit theme variables** từ global CSS
2. **Match border-radius, shadows, spacing** của existing elements
3. **Follow animation timing** và transition styles hiện tại
4. **Respect color contrast ratios** đã established
