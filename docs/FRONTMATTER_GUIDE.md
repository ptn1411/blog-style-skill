# Hướng dẫn viết blog với Frontmatter

Frontmatter là phần metadata ở đầu file Markdown, được bao bọc bởi `---`. Nó chứa thông tin về bài viết như title, tags, author, v.v.

## Cấu trúc Frontmatter

```yaml
---
title: "Tiêu đề bài viết"
excerpt: "Mô tả ngắn về bài viết (SEO description)"
category: JavaScript
tags:
  - javascript
  - react
  - web-development
author: "Tên tác giả"
image: /path/to/image.png
publishDate: 2025-01-11T00:00:00.000Z
---
```

## Các trường Frontmatter

| Trường | Bắt buộc | Mô tả |
|--------|----------|-------|
| `title` | ✅ | Tiêu đề bài viết, hiển thị trên trang và SEO |
| `excerpt` | ✅ | Mô tả ngắn 150-160 ký tự cho SEO |
| `category` | ✅ | Danh mục chính của bài viết |
| `tags` | ✅ | Danh sách tags liên quan |
| `author` | ✅ | Tên tác giả |
| `image` | ⚪ | Đường dẫn ảnh thumbnail/hero |
| `publishDate` | ⚪ | Ngày xuất bản (ISO 8601 format) |

## Ví dụ đầy đủ

```yaml
---
title: "React Query: Quản lý Server State đơn giản và hiệu quả"
excerpt: "Hướng dẫn sử dụng React Query để quản lý API calls, caching, và server state trong React applications."
category: React
tags:
  - react
  - react-query
  - state-management
  - api
  - typescript
author: "Phạm Thành Nam"
image: /images/react-query-guide.png
publishDate: 2025-01-11T00:00:00.000Z
---

# React Query: Quản lý Server State đơn giản và hiệu quả

Nội dung bài viết...
```

## Tips viết Frontmatter

### Title
- Ngắn gọn, súc tích (50-60 ký tự)
- Chứa keyword chính
- Không dùng dấu ngoặc kép bên trong

```yaml
# ✅ Tốt
title: "React Hooks: Hướng dẫn từ cơ bản đến nâng cao"

# ❌ Tránh
title: "Tất cả những gì bạn cần biết về React Hooks - Hướng dẫn chi tiết nhất 2025"
```

### Excerpt
- 150-160 ký tự (tối ưu cho SEO)
- Mô tả nội dung chính
- Chứa keyword

```yaml
# ✅ Tốt
excerpt: "Hướng dẫn chi tiết React Hooks giúp bạn hiểu useState, useEffect, và custom hooks với ví dụ thực tế."

# ❌ Tránh (quá dài)
excerpt: "Trong bài viết này, chúng ta sẽ tìm hiểu tất cả mọi thứ về React Hooks bao gồm useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef và cách tạo custom hooks từ đầu đến cuối với rất nhiều ví dụ thực tế..."
```

### Tags
- 3-7 tags mỗi bài
- Lowercase, dùng dấu gạch ngang
- Từ chung đến cụ thể

```yaml
# ✅ Tốt
tags:
  - javascript
  - react
  - hooks
  - state-management

# ❌ Tránh
tags:
  - JavaScript  # Không lowercase
  - react hooks # Có space
  - tag1, tag2  # Sai format
```

### Category
- Một category duy nhất
- Danh mục chính của bài viết

```yaml
# Các category phổ biến
category: JavaScript
category: React
category: Node.js
category: TypeScript
category: DevOps
category: Career
```

### PublishDate
- Format ISO 8601
- Timezone UTC

```yaml
# Format chuẩn
publishDate: 2025-01-11T00:00:00.000Z

# Hoặc chỉ ngày
publishDate: 2025-01-11
```

## Prompt cho AI

Khi yêu cầu AI viết blog với frontmatter:

```
Viết blog về [CHỦ ĐỀ] với frontmatter đầy đủ.

Yêu cầu frontmatter:
- title: Tiêu đề SEO-friendly, 50-60 ký tự
- excerpt: Mô tả 150-160 ký tự
- category: [CATEGORY]
- tags: 5 tags liên quan
- author: "Phạm Thành Nam"
- publishDate: [NGÀY]

Yêu cầu nội dung:
- Structure: comprehensive (nhiều sections)
- Style: tutorial
- Tone: friendly
- Có code examples
```

## Cấu trúc bài viết với Frontmatter

```markdown
---
title: "..."
excerpt: "..."
category: ...
tags:
  - ...
author: "..."
publishDate: ...
---

# Tiêu đề (giống title)

Đoạn mở đầu giới thiệu vấn đề...

---

## 1. Section đầu tiên

Nội dung...

---

## 2. Section thứ hai

Nội dung...

---

## Kết luận

Tóm tắt và next steps...
```

## Checklist

- [ ] Title 50-60 ký tự, có keyword
- [ ] Excerpt 150-160 ký tự
- [ ] Category phù hợp
- [ ] 3-7 tags, lowercase, có gạch ngang
- [ ] Author name đúng
- [ ] PublishDate format ISO 8601
- [ ] Image path đúng (nếu có)
- [ ] Không có lỗi YAML syntax
