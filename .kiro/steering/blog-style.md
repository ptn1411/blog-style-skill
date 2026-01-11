---
inclusion: manual
---

# Blog Style Skill

Skill viết blog theo phong cách cá nhân - gần gũi, rõ ràng, tư duy kỹ sư.

## Activation

Kích hoạt khi user yêu cầu viết blog hoặc bài viết về technology/programming.

## Data Sources

Tham khảo data từ `.shared/data/`:

| File | Nội dung |
|------|----------|
| `writing-styles.json` | 6 writing styles (conversational, technical, storytelling...) |
| `tone-variations.json` | 5 tone options (friendly, professional, educational...) |
| `blog-structures.json` | 6 structure templates (standard, listicle, case-study...) |
| `industry-templates.json` | 6 industry guides (SaaS, Fintech, DevTools...) |
| `marketing-blacklist.json` | 7 categories of phrases to avoid |
| `formatting-rules.json` | Formatting constraints |

## Search Script

```bash
python .shared/scripts/search.py <query>
```

Examples:
- `python .shared/scripts/search.py tutorial` - Find tutorial-related content
- `python .shared/scripts/search.py saas` - Find SaaS industry template
- `python .shared/scripts/search.py friendly` - Find friendly tone

## Default Structure

1. **Giới thiệu** - Context và tầm quan trọng
2. **Vấn đề thực tế** - Phân tích real-world, common mistakes
3. **Cách tiếp cận** - Reasoning và so sánh options
4. **Ví dụ triển khai** - Code snippets cụ thể
5. **Kết luận** - Tóm tắt và action items

## Formatting Rules

- Paragraphs: Max 5 lines
- Sentences: 5-50 words
- Headings: H1 → H2 → H3 hierarchy
- Code blocks: Always specify language
- Lists: Max 10 items

## Style Guidelines

### DO ✅
- Viết như nói chuyện với đồng nghiệp
- Giải thích "vì sao" trước "làm như thế nào"
- Dùng ví dụ code thực tế
- Đi thẳng vào vấn đề

### DON'T ❌
- Dùng từ ngữ marketing, hype
- Viết paragraphs dài quá 5 lines
- Skip heading levels
- Dịch thuật ngữ kỹ thuật sang tiếng Việt

## Validation

Sử dụng TypeScript utilities trong `src/`:
- `validateInput()` - Validate input topic
- `validateBlog()` - Validate blog structure
- `checkStyle()` - Check style compliance
- `validateTemplate()` - Validate template

## File References

- #[[file:../../.shared/data/writing-styles.json]]
- #[[file:../../.shared/data/tone-variations.json]]
- #[[file:../../.shared/data/blog-structures.json]]
- #[[file:../../examples/blog_sample_01.md]]
- #[[file:../../templates/blog_template.md]]
