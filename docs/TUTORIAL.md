# Hướng dẫn viết blog với AI Blog Style Skill

Hướng dẫn từng bước để viết một bài blog hoàn chỉnh sử dụng AI Blog Style Skill.

## Mục lục

1. [Chuẩn bị](#1-chuẩn-bị)
2. [Chọn style và structure](#2-chọn-style-và-structure)
3. [Viết blog với AI](#3-viết-blog-với-ai)
4. [Validate và chỉnh sửa](#4-validate-và-chỉnh-sửa)
5. [Ví dụ hoàn chỉnh](#5-ví-dụ-hoàn-chỉnh)

---

## 1. Chuẩn bị

### Cài đặt CLI

```bash
npm install -g ai-blog-style-skill
```

### Khởi tạo trong project

```bash
cd my-blog-project
blog-style init
```

Trả lời các câu hỏi:
```
Project name: tech-blog
Preferred tone: friendly
Preferred structure: standard
Industry: devtools
```

### Cài đặt cho AI platform

```bash
# Cho Cursor
blog-style install cursor

# Cho Claude
blog-style install claude

# Cho tất cả
blog-style install --all
```

---

## 2. Chọn style và structure

### Tìm style phù hợp

```bash
# Xem tất cả styles
blog-style list style
```

Output:
```
📝 Writing Styles (6)
──────────────────────────────────────────────────
  conversational  Conversational (Gần gũi)
                  Write like talking to a colleague
                  Best for: tutorials, personal blogs, developer stories

  technical       Technical (Kỹ thuật)
                  Precise, detailed, focused on accuracy
                  Best for: documentation, API guides, architecture posts

  tutorial        Tutorial (Hướng dẫn)
                  Step-by-step instructional content
                  Best for: how-to guides, setup guides, learning paths
```

### Tìm structure phù hợp

```bash
# Xem tất cả structures
blog-style list structure
```

Output:
```
📋 Blog Structures (6)
──────────────────────────────────────────────────
  standard        Standard Blog (Blog Chuẩn)
                  Sections: Giới thiệu → Vấn đề thực tế → Cách tiếp cận → Ví dụ triển khai → Kết luận
                  Best for: technical tutorials, how-to guides

  tutorial        Step-by-Step Tutorial (Hướng dẫn từng bước)
                  Sections: Tổng quan → Yêu cầu → Các bước thực hiện → Xử lý lỗi → Bước tiếp theo
                  Best for: setup guides, implementation tutorials
```

### Search theo topic

```bash
# Tìm theo chủ đề
blog-style search react
blog-style search api
blog-style search performance
```

---

## 3. Viết blog với AI

### Prompt cơ bản

Mở AI assistant (Cursor, Claude, etc.) và sử dụng prompt:

```
Viết blog về [CHỦ ĐỀ] theo skill blog-style đã cài đặt.

Yêu cầu:
- Style: conversational (gần gũi)
- Structure: standard (5 sections)
- Tone: friendly
- Có code examples
```

### Prompt chi tiết hơn

```
Viết blog về "Cách sử dụng React Query để quản lý server state"

Áp dụng blog-style skill với:
- Writing style: tutorial
- Tone: friendly, educational
- Structure: standard (Giới thiệu, Vấn đề, Cách tiếp cận, Ví dụ, Kết luận)
- Target audience: React developers
- Có code examples với TypeScript
- Giải thích "vì sao" trước "làm như thế nào"
```

### Prompt cho specific industry

```
Viết blog về "Thiết kế API cho SaaS product"

Áp dụng:
- Industry: saas
- Style: technical
- Tone: professional
- Có real-world examples
- Focus vào scalability và best practices
```

---

## 4. Validate và chỉnh sửa

### Validate blog

```bash
blog-style validate my-blog.md
```

### Xem kết quả chi tiết

```
📄 Validating: my-blog.md

✅ PASSED - Blog meets all style requirements

📋 Section Validation:
   ✓ All required sections present

📑 Heading Validation:
   ✓ Valid heading structure
   H1: Yes, H2 count: 5

📝 Paragraph Validation:
   ✓ All paragraphs within 5 lines

💻 Code Block Validation:
   ✓ All code blocks have language identifiers

🚫 Marketing Phrase Check:
   ✓ No marketing phrases found

📊 Summary:
   Errors: 0
   Warnings: 0
```

### Nếu có lỗi

```
❌ FAILED - Blog has validation issues

📋 Section Validation:
   ✗ Missing sections:
     - Kết luận

📝 Paragraph Validation:
   ✗ 2 paragraph(s) too long:
     Line 45: 7 lines - "Khi bạn bắt đầu..."

🚫 Marketing Phrase Check:
   ✗ Found 1 marketing phrase(s):
     Line 23: "tốt nhất"
```

### Sửa lỗi thường gặp

| Lỗi | Cách sửa |
|-----|----------|
| Missing section | Thêm section còn thiếu |
| Paragraph too long | Chia nhỏ thành nhiều đoạn (max 5 dòng) |
| Marketing phrase | Thay bằng từ ngữ cụ thể hơn |
| Code block no language | Thêm language identifier (```typescript) |
| Sentence too long | Chia thành câu ngắn hơn (max 50 words) |

---

## 5. Ví dụ hoàn chỉnh

### Bước 1: Chọn chủ đề

Chủ đề: **"Sử dụng React Query để quản lý API calls"**

### Bước 2: Search style phù hợp

```bash
blog-style search react
blog-style search api
```

Chọn:
- Style: `tutorial`
- Structure: `standard`
- Tone: `friendly`

### Bước 3: Prompt cho AI

```
Viết blog về "Sử dụng React Query để quản lý API calls trong React app"

Áp dụng blog-style skill:
- Style: tutorial (hướng dẫn từng bước)
- Tone: friendly (gần gũi như nói chuyện với đồng nghiệp)
- Structure: standard 5 sections
- Language: Vietnamese, giữ nguyên technical terms tiếng Anh
- Có code examples với TypeScript
- Giải thích "vì sao" trước "làm như thế nào"
- Paragraphs max 5 lines
- Sentences 5-50 words
```

### Bước 4: AI generate blog

(Xem file `examples/demo_react_query.md`)

### Bước 5: Validate

```bash
blog-style validate examples/demo_react_query.md
```

### Bước 6: Publish

Blog đã sẵn sàng để publish!

---

## Tips & Best Practices

### DO ✅

- Luôn validate trước khi publish
- Sử dụng code examples thực tế
- Giải thích "vì sao" trước "làm như thế nào"
- Giữ paragraphs ngắn (max 5 lines)
- Dùng heading hierarchy đúng (H1 → H2 → H3)

### DON'T ❌

- Dùng marketing phrases ("tốt nhất", "đột phá", "cách mạng")
- Viết paragraphs dài quá 5 dòng
- Skip heading levels (H1 → H3)
- Dịch technical terms sang tiếng Việt
- Viết abstract mà không có examples

### Checklist trước khi publish

- [ ] Có đủ 5 sections (hoặc theo structure đã chọn)
- [ ] Heading hierarchy đúng
- [ ] Paragraphs ≤ 5 lines
- [ ] Code blocks có language identifier
- [ ] Không có marketing phrases
- [ ] Có real-world examples
- [ ] Validate pass với `blog-style validate --strict`

---

## Troubleshooting

### CLI không tìm thấy data

```bash
# Reinstall
blog-style install --all --force
```

### Validate báo lỗi encoding

Đảm bảo file markdown là UTF-8.

### AI không follow style

Thêm explicit instructions trong prompt:
```
QUAN TRỌNG:
- Paragraphs PHẢI ≤ 5 lines
- KHÔNG dùng từ: "tốt nhất", "đột phá", "cách mạng"
- Code blocks PHẢI có language identifier
```

---

## Next Steps

1. Đọc thêm examples trong `examples/`
2. Customize rules trong `.blog-style.json`
3. Tạo custom templates cho team
4. Integrate vào CI/CD pipeline
