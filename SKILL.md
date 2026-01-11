---
name: blog-writer-myvoice
description: Write blog posts in personal style - gần gũi, rõ ràng, tư duy kỹ sư
version: 2.0.0
author: Phạm Thành Nam
language: Vietnamese (with English technical terms)
---

# AI Blog Style Skill

Skill này giúp AI viết blog theo phong cách cá nhân. Phong cách viết gần gũi như nói chuyện với đồng nghiệp, rõ ràng đi thẳng vào vấn đề, và mang tư duy kỹ sư - giải thích "vì sao" trước khi nói "làm như thế nào".

## Activation Conditions

Skill này được kích hoạt khi:
- User yêu cầu viết blog hoặc bài viết
- Nội dung liên quan đến technology/programming
- User muốn viết theo phong cách cá nhân, không formal

## Data Sources

### Searchable Database

Sử dụng search script để tìm data phù hợp:

```bash
python .shared/scripts/search.py <query>
```

### Available Data

| File | Content |
|------|---------|
| `.shared/data/writing-styles.json` | 6 writing styles |
| `.shared/data/tone-variations.json` | 5 tone variations |
| `.shared/data/blog-structures.json` | 6 blog structures |
| `.shared/data/industry-templates.json` | 6 industry templates |
| `.shared/data/marketing-blacklist.json` | 7 blacklist categories |
| `.shared/data/formatting-rules.json` | Formatting rules |

## Instructions

### Bước 1: Search Relevant Data

```bash
# Search by topic
python .shared/scripts/search.py react

# Search by style
python .shared/scripts/search.py tutorial

# Search by industry
python .shared/scripts/search.py saas
```

### Bước 2: Select Configuration

Chọn từ data:
- **Writing Style**: conversational, technical, storytelling, analytical, tutorial, opinion
- **Tone**: friendly, professional, educational, enthusiastic, pragmatic
- **Structure**: standard, listicle, case-study, comparison, tutorial, opinion

### Bước 3: Apply Structure

Default structure (5 sections):

```markdown
# [Title]

## Giới thiệu
[Context và tầm quan trọng của vấn đề]

## Vấn đề thực tế
[Phân tích real-world, common mistakes]

## Cách tiếp cận
[Reasoning và so sánh các options]

## Ví dụ triển khai
[Code snippets, case studies cụ thể]

## Kết luận
[Tóm tắt và action items]
```

### Bước 4: Check Blacklist

Tránh các cụm từ trong `.shared/data/marketing-blacklist.json`:

- **Superlatives**: "số 1", "tốt nhất", "hoàn hảo"
- **Hype words**: "cách mạng", "đột phá", "siêu việt"
- **Empty promises**: "đảm bảo thành công", "100% hiệu quả"
- **Urgency phrases**: "đừng bỏ lỡ", "cơ hội cuối cùng"
- **Vague qualifiers**: "rất nhiều", "cực kỳ", "vô cùng"
- **Sales language**: "mua ngay", "đăng ký ngay"
- **Tech buzzwords**: "ai-powered", "next-gen", "cutting-edge"

### Bước 5: Apply Formatting Rules

From `.shared/data/formatting-rules.json`:

| Rule | Value |
|------|-------|
| Paragraphs | Max 5 lines |
| Sentences | 5-50 words |
| Headings | H1 → H2 → H3 hierarchy |
| Code blocks | Always specify language |
| Lists | Max 10 items |

### Bước 6: Save Output

Sau khi viết xong, **BẮT BUỘC** lưu bài viết vào file `.md`:

**Quy tắc đặt tên file:**
- Format: `[slug-tu-title].md`
- Slug: lowercase, dùng dấu `-` thay khoảng trắng, bỏ dấu tiếng Việt
- Ví dụ: "React Hooks Cơ Bản" → `react-hooks-co-ban.md`

**Vị trí lưu:**
- Default: `examples/` folder
- Hoặc theo yêu cầu của user

**Ví dụ:**
```
# User yêu cầu viết về "Tối ưu React Performance"
# AI viết xong → Lưu vào: examples/toi-uu-react-performance.md
```

### Bước 7: Validate Output

Đảm bảo output đáp ứng:
- [ ] Có đủ sections theo structure đã chọn
- [ ] Markdown valid với heading hierarchy đúng
- [ ] Không có marketing phrases từ blacklist
- [ ] Paragraphs không quá 5 lines
- [ ] Code blocks có language identifier
- [ ] Sentences ngắn-trung bình (5-50 words)
- [ ] **File đã được lưu vào .md**

## Style Guidelines Summary

### DO ✅
- Viết như nói chuyện với đồng nghiệp
- Giải thích "vì sao" trước "làm như thế nào"
- Dùng ví dụ code thực tế
- Đi thẳng vào vấn đề
- Dùng số liệu cụ thể thay vì từ ngữ mơ hồ

### DON'T ❌
- Dùng từ ngữ marketing, hype
- Viết paragraphs dài quá 5 lines
- Skip heading levels (H1 → H3)
- Dịch thuật ngữ kỹ thuật sang tiếng Việt
- Viết abstract mà không có examples

## Example Usage

### Input
```
Viết blog về cách optimize React performance
```

### Expected Output Structure
```markdown
# Optimize React Performance: Những Kỹ thuật Thực tế từ Production

## Giới thiệu
[Context về vấn đề performance trong React apps...]

## Vấn đề thực tế
[Các lỗi phổ biến gây slow render...]

## Cách tiếp cận
[Giải thích React.memo, useMemo, useCallback và khi nào dùng...]

## Ví dụ triển khai
[Code examples với before/after comparison...]

## Kết luận
[Summary và next steps...]
```

## Validation Utilities

TypeScript utilities trong `src/`:

```typescript
import { validateInput, validateBlog, checkStyle } from './src';

// Validate input
const input = validateInput('Topic');

// Validate blog structure
const blog = validateBlog(content);

// Check style compliance
const style = checkStyle(content);
```

## File References

- Data: `.shared/data/`
- Scripts: `.shared/scripts/`
- Examples: `examples/`
- Templates: `templates/`
- Rules: `rules/`
- Validators: `src/`
- Docs: `docs/`

## Extending Data

Để thêm/mở rộng data (styles, tones, structures, templates...), xem hướng dẫn chi tiết tại:

📄 **`docs/DATA_PROMPTS.md`** - Các prompt chuẩn để AI tạo data mới
