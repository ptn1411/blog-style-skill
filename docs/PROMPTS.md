# Prompts để ra lệnh cho AI viết bài

Tổng hợp các prompts mẫu để yêu cầu AI viết blog theo đúng style.

---

## 🚀 Quick Start

### Prompt đơn giản nhất

```
Viết blog về [CHỦ ĐỀ] theo blog-style skill.
```

Ví dụ:
```
Viết blog về React Hooks theo blog-style skill.
```

---

## 📝 Prompts theo mức độ chi tiết

### Level 1: Cơ bản

```
Viết blog về [CHỦ ĐỀ].

Áp dụng blog-style skill với:
- Style: conversational
- Tone: friendly
- Có code examples
```

### Level 2: Trung bình

```
Viết blog về "[TIÊU ĐỀ ĐẦY ĐỦ]"

Yêu cầu:
- Structure: standard (5 sections: Giới thiệu, Vấn đề, Cách tiếp cận, Ví dụ, Kết luận)
- Style: tutorial
- Tone: friendly, educational
- Language: Vietnamese, giữ nguyên technical terms tiếng Anh
- Có code examples với [NGÔN NGỮ]
- Paragraphs max 5 dòng
- Giải thích "vì sao" trước "làm như thế nào"
```

### Level 3: Chi tiết (có frontmatter)

```
Viết blog về "[TIÊU ĐỀ]" với frontmatter đầy đủ.

Frontmatter:
- title: "[TIÊU ĐỀ SEO 50-60 ký tự]"
- excerpt: "[MÔ TẢ 150-160 ký tự]"
- category: [CATEGORY]
- tags: [TAG1], [TAG2], [TAG3], [TAG4], [TAG5]
- author: "Phạm Thành Nam"
- publishDate: [YYYY-MM-DD]

Nội dung:
- Structure: comprehensive (nhiều sections)
- Style: tutorial
- Tone: friendly
- Target audience: [ĐỐI TƯỢNG]
- Có code examples với [NGÔN NGỮ]
- Không dùng marketing phrases
- Paragraphs max 5 dòng
- Sentences 5-50 words
```

---

## 🎯 Prompts theo loại bài viết

### Tutorial / Hướng dẫn

```
Viết tutorial về [CHỦ ĐỀ].

Yêu cầu:
- Structure: tutorial (Tổng quan → Yêu cầu → Các bước → Xử lý lỗi → Bước tiếp theo)
- Style: step-by-step
- Có code examples hoàn chỉnh
- Giải thích từng bước rõ ràng
- Có troubleshooting section
```

### So sánh / Comparison

```
Viết bài so sánh [A] vs [B] vs [C].

Yêu cầu:
- Structure: comparison (Giới thiệu → Tiêu chí → Phân tích → Khuyến nghị → Kết luận)
- Có bảng so sánh
- Đưa ra recommendation rõ ràng
- Giải thích khi nào dùng cái nào
```

### Case Study

```
Viết case study về [DỰ ÁN/VẤN ĐỀ].

Yêu cầu:
- Structure: case-study (Bối cảnh → Thách thức → Giải pháp → Kết quả → Bài học)
- Có số liệu cụ thể
- Lessons learned rõ ràng
- Actionable insights
```

### Listicle / Danh sách

```
Viết bài "[SỐ] [CHỦ ĐỀ] mà developer cần biết".

Yêu cầu:
- Structure: listicle
- Mỗi item có giải thích ngắn gọn
- Có code example cho mỗi item
- Sắp xếp từ cơ bản đến nâng cao
```

### Opinion / Quan điểm

```
Viết bài quan điểm về [CHỦ ĐỀ].

Yêu cầu:
- Structure: opinion (Luận điểm → Lập luận → Phản biện → Kết luận → Call to action)
- Có stance rõ ràng
- Đưa ra counterpoints
- Kết thúc với call to action
```

---

## 🏢 Prompts theo Industry

### SaaS / Software

```
Viết blog về [CHỦ ĐỀ] cho SaaS product.

Yêu cầu:
- Industry: saas
- Focus: scalability, integration, API
- Tone: technical-friendly
- Có real-world examples từ SaaS products
```

### DevTools

```
Viết blog về [CHỦ ĐỀ] cho developer tools.

Yêu cầu:
- Industry: devtools
- Focus: DX, productivity, workflow
- Tone: technical-conversational
- Có CLI examples và code snippets
```

### Fintech

```
Viết blog về [CHỦ ĐỀ] cho fintech.

Yêu cầu:
- Industry: fintech
- Focus: security, compliance, reliability
- Tone: professional-technical
- Chú ý best practices về security
```

---

## ✅ Prompts với validation rules

### Strict mode

```
Viết blog về [CHỦ ĐỀ].

QUAN TRỌNG - Tuân thủ nghiêm ngặt:
- Paragraphs PHẢI ≤ 5 dòng
- Sentences PHẢI 5-50 words
- KHÔNG dùng: "tốt nhất", "đột phá", "cách mạng", "số 1", "hoàn hảo"
- Code blocks PHẢI có language identifier
- Heading hierarchy: H1 → H2 → H3 (không skip)
- Mỗi section PHẢI có nội dung thực sự
```

---

## 📋 Template Prompts

### Template 1: Blog chuẩn

```
Viết blog về "[CHỦ ĐỀ]"

Format:
---
title: "[Tiêu đề SEO]"
excerpt: "[Mô tả 150 ký tự]"
category: [Category]
tags: [tag1, tag2, tag3]
author: "Phạm Thành Nam"
---

# [Tiêu đề]

## Giới thiệu
[Hook + context + tầm quan trọng]

## Vấn đề thực tế
[Phân tích vấn đề + common mistakes]

## Cách tiếp cận
[Giải pháp + reasoning + so sánh]

## Ví dụ triển khai
[Code examples + step by step]

## Kết luận
[Summary + key takeaways + next steps]
```

### Template 2: Tutorial chi tiết

```
Viết tutorial "[TIÊU ĐỀ]"

Format:
---
title: "[Tiêu đề]"
excerpt: "[Mô tả]"
category: Tutorial
tags: [tags]
---

# [Tiêu đề]

## Tổng quan
[Giới thiệu + mục tiêu + kết quả đạt được]

## Yêu cầu
[Prerequisites + tools + knowledge]

## Bước 1: [Tên bước]
[Hướng dẫn + code + giải thích]

## Bước 2: [Tên bước]
[Hướng dẫn + code + giải thích]

## Bước N: [Tên bước]
[Hướng dẫn + code + giải thích]

## Xử lý lỗi thường gặp
[Common errors + solutions]

## Kết luận
[Summary + next steps + resources]
```

---

## 💡 Tips

1. **Càng cụ thể càng tốt** - AI sẽ follow instructions tốt hơn
2. **Đưa ví dụ** - Nếu có bài mẫu, đưa vào prompt
3. **Specify audience** - Developer junior vs senior sẽ có content khác nhau
4. **Mention language** - TypeScript vs JavaScript, Python vs Go
5. **Set constraints** - Độ dài, format, những gì cần tránh

---

## � WYêu cầu AI lưu file

### Prompt mặc định (tự động lưu)

```
Viết blog về [CHỦ ĐỀ] theo blog-style skill.
Lưu vào file .md sau khi viết xong.
```

### Prompt với tên file cụ thể

```
Viết blog về [CHỦ ĐỀ] theo blog-style skill.
Lưu vào file: examples/[ten-file].md
```

### Prompt với folder tùy chọn

```
Viết blog về [CHỦ ĐỀ] theo blog-style skill.
Lưu vào: [ĐƯỜNG DẪN]/[ten-file].md
```

### Ví dụ cụ thể

```
Viết blog về React Query cơ bản.
Lưu vào file: examples/react-query-co-ban.md
```

---

## 🔄 Workflow đề xuất

```
1. Chọn chủ đề
   ↓
2. Chọn structure phù hợp (blog-style list structure)
   ↓
3. Copy prompt template
   ↓
4. Customize với chủ đề của bạn
   ↓
5. Gửi cho AI
   ↓
6. AI viết + TỰ ĐỘNG LƯU vào file .md
   ↓
7. Review output
   ↓
8. Validate với CLI: blog-style validate my-blog.md
   ↓
9. Fix issues nếu có
   ↓
10. Publish!
```
