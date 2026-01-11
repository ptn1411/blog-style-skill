# Prompts để AI tạo/thêm Data cho Blog Style Skill

Hướng dẫn các câu lệnh để yêu cầu AI tạo hoặc mở rộng data đúng chuẩn.

---

## 📁 Tổng quan cấu trúc Data

| Folder/File | Mục đích |
|-------------|----------|
| `.shared/data/*.json` | Data chính (styles, tones, structures...) |
| `templates/*.md` | Blog templates |
| `examples/*.md` | Bài viết mẫu |
| `rules/*.md` | Quy tắc viết |

---

## 1️⃣ Thêm Writing Style mới

### Prompt

```
Thêm writing style mới vào blog-style skill.

Style name: [TÊN STYLE]
Mô tả: [MÔ TẢ NGẮN]

Yêu cầu:
- Thêm vào file: .shared/data/writing-styles.json
- Theo đúng schema hiện có
- Có đầy đủ: id, name, nameVi, description, characteristics, bestFor, example
```

### Schema chuẩn

```json
{
  "id": "style-id-lowercase",
  "name": "Style Name",
  "nameVi": "Tên tiếng Việt",
  "description": "Mô tả ngắn bằng tiếng Anh",
  "characteristics": ["đặc điểm 1", "đặc điểm 2", "đặc điểm 3", "đặc điểm 4"],
  "bestFor": ["use case 1", "use case 2", "use case 3"],
  "example": "Ví dụ một đoạn văn theo style này..."
}
```

### Ví dụ cụ thể

```
Thêm writing style mới vào blog-style skill.

Style name: Deep Dive
Mô tả: Phân tích chuyên sâu một chủ đề, đi sâu vào chi tiết kỹ thuật

Yêu cầu:
- Thêm vào file: .shared/data/writing-styles.json
- Theo đúng schema hiện có
```

---

## 2️⃣ Thêm Tone mới

### Prompt

```
Thêm tone mới vào blog-style skill.

Tone name: [TÊN TONE]
Mô tả: [MÔ TẢ]

Yêu cầu:
- Thêm vào file: .shared/data/tone-variations.json
- Có đầy đủ: id, name, nameVi, description, markers, avoid
```

### Schema chuẩn

```json
{
  "id": "tone-id-lowercase",
  "name": "Tone Name",
  "nameVi": "Tên tiếng Việt",
  "description": "Mô tả tone này",
  "markers": ["từ/cụm từ đặc trưng 1", "từ 2", "từ 3"],
  "avoid": ["điều cần tránh 1", "điều cần tránh 2"]
}
```

### Ví dụ cụ thể

```
Thêm tone mới vào blog-style skill.

Tone name: Humorous
Mô tả: Hài hước, dí dỏm nhưng vẫn chuyên nghiệp

Yêu cầu:
- Thêm vào file: .shared/data/tone-variations.json
```

---

## 3️⃣ Thêm Blog Structure mới

### Prompt

```
Thêm blog structure mới vào blog-style skill.

Structure name: [TÊN STRUCTURE]
Mô tả: [MÔ TẢ]
Sections: [DANH SÁCH SECTIONS]

Yêu cầu:
- Thêm vào file: .shared/data/blog-structures.json
- Có đầy đủ: id, name, nameVi, sections, sectionsVi, bestFor
```

### Schema chuẩn

```json
{
  "id": "structure-id",
  "name": "Structure Name",
  "nameVi": "Tên tiếng Việt",
  "sections": ["section1", "section2", "section3"],
  "sectionsVi": ["Section 1 tiếng Việt", "Section 2", "Section 3"],
  "bestFor": ["use case 1", "use case 2"]
}
```

### Ví dụ cụ thể

```
Thêm blog structure mới vào blog-style skill.

Structure name: Problem-Solution
Mô tả: Cấu trúc tập trung vào vấn đề và giải pháp
Sections: Problem Statement, Root Cause, Solution Options, Implementation, Results

Yêu cầu:
- Thêm vào file: .shared/data/blog-structures.json
```

---

## 4️⃣ Thêm Industry Template mới

### Prompt

```
Thêm industry template mới vào blog-style skill.

Industry: [TÊN NGÀNH]
Topics: [CÁC CHỦ ĐỀ PHÙ HỢP]
Tone: [TONE PHÙ HỢP]

Yêu cầu:
- Thêm vào file: .shared/data/industry-templates.json
- Có đầy đủ: id, name, topics, tone, keywords
```

### Schema chuẩn

```json
{
  "id": "industry-id",
  "name": "Industry Name",
  "topics": ["topic 1", "topic 2", "topic 3", "topic 4"],
  "tone": "tone-combination",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
```

### Ví dụ cụ thể

```
Thêm industry template mới vào blog-style skill.

Industry: Healthcare Tech
Topics: HIPAA compliance, patient data, medical devices, telemedicine
Tone: professional-educational

Yêu cầu:
- Thêm vào file: .shared/data/industry-templates.json
```

---

## 5️⃣ Thêm Marketing Blacklist

### Prompt

```
Thêm category blacklist mới vào blog-style skill.

Category: [TÊN CATEGORY]
Mô tả: [MÔ TẢ]
Phrases: [DANH SÁCH CỤM TỪ CẦN TRÁNH]

Yêu cầu:
- Thêm vào file: .shared/data/marketing-blacklist.json
- Thêm vào object "categories"
```

### Schema chuẩn

```json
{
  "categoryName": {
    "description": "Mô tả category này",
    "phrases": [
      "cụm từ 1", "cụm từ 2", "cụm từ 3",
      "english phrase 1", "english phrase 2"
    ]
  }
}
```

### Ví dụ cụ thể

```
Thêm category blacklist mới vào blog-style skill.

Category: clickbait
Mô tả: Tiêu đề câu view, gây tò mò quá mức
Phrases: "bạn sẽ không tin", "điều số 5 sẽ khiến bạn sốc", "bí mật mà không ai nói", "you won't believe", "shocking truth"

Yêu cầu:
- Thêm vào file: .shared/data/marketing-blacklist.json
```

---

## 6️⃣ Tạo Blog Template mới

### Prompt

```
Tạo blog template mới cho blog-style skill.

Template name: [TÊN TEMPLATE]
Mục đích: [MÔ TẢ]
Sections: [DANH SÁCH SECTIONS]

Yêu cầu:
- Lưu vào: templates/[tên-template].md
- Có frontmatter với các fields: title, excerpt, category, tags, author, publishDate
- Dùng placeholder {{PLACEHOLDER_NAME}}
```

### Ví dụ cụ thể

```
Tạo blog template mới cho blog-style skill.

Template name: Quick Tips
Mục đích: Bài viết ngắn chia sẻ tips nhanh
Sections: Intro, Tips (numbered list), Bonus Tip, Conclusion

Yêu cầu:
- Lưu vào: templates/quick_tips_template.md
```

---

## 7️⃣ Tạo Example Blog mới

### Prompt

```
Tạo example blog mới cho blog-style skill.

Chủ đề: [CHỦ ĐỀ]
Style: [STYLE]
Structure: [STRUCTURE]

Yêu cầu:
- Lưu vào: examples/[slug-tu-title].md
- Có frontmatter đầy đủ
- Tuân thủ tất cả writing rules
- Không dùng marketing phrases
```

### Ví dụ cụ thể

```
Tạo example blog mới cho blog-style skill.

Chủ đề: Git Workflow cho team nhỏ
Style: tutorial
Structure: standard

Yêu cầu:
- Lưu vào: examples/git-workflow-team-nho.md
```

---

## 8️⃣ Tạo Writing Rule mới

### Prompt

```
Tạo writing rule mới cho blog-style skill.

Rule name: [TÊN RULE]
Mục đích: [MÔ TẢ]

Yêu cầu:
- Lưu vào: rules/[tên-rule].md
- Format: Markdown với DO/DON'T sections
- Có examples cho mỗi rule
```

### Ví dụ cụ thể

```
Tạo writing rule mới cho blog-style skill.

Rule name: Code Examples
Mục đích: Quy tắc viết code examples trong blog

Yêu cầu:
- Lưu vào: rules/code_examples.md
```

---

## 🔄 Prompt tổng hợp - Mở rộng nhiều data cùng lúc

```
Mở rộng blog-style skill với các data sau:

1. Writing Style mới:
   - Name: [TÊN]
   - Mô tả: [MÔ TẢ]

2. Tone mới:
   - Name: [TÊN]
   - Mô tả: [MÔ TẢ]

3. Structure mới:
   - Name: [TÊN]
   - Sections: [SECTIONS]

Yêu cầu:
- Cập nhật các file JSON tương ứng trong .shared/data/
- Theo đúng schema hiện có
- Giữ nguyên data cũ, chỉ thêm mới
```

---

## ✅ Checklist khi thêm Data

- [ ] Đúng file location
- [ ] Đúng JSON schema
- [ ] Có đủ fields bắt buộc
- [ ] id là lowercase, dùng dấu `-`
- [ ] Có cả name (English) và nameVi (Vietnamese)
- [ ] Không duplicate với data hiện có
- [ ] JSON valid (không lỗi syntax)

---

## 💡 Tips

1. **Xem data hiện có trước** - Dùng `blog-style list` để xem data
2. **Giữ consistency** - Theo đúng format của data hiện có
3. **Test sau khi thêm** - Dùng `blog-style search [keyword]` để verify
4. **Backup trước khi sửa** - Đề phòng lỗi
