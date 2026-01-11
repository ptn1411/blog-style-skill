---
name: blog-writer-myvoice
description: Write blog posts in personal style - gần gũi, rõ ràng, tư duy kỹ sư
version: 2.0.0
author: Phạm Thành Nam
---

# AI Blog Style Skill

Skill này giúp AI viết blog theo phong cách cá nhân - gần gũi như nói chuyện với đồng nghiệp, rõ ràng đi thẳng vào vấn đề, và mang tư duy kỹ sư.

## Activation

This skill activates when:
- User requests to write a blog or article
- Content relates to technology/programming
- User wants personal, non-formal writing style

## Instructions

### 1. Search for Relevant Data

Use the search script to find matching styles, tones, and templates:

```bash
python .shared/scripts/search.py <topic>
```

### 2. Load Writing Rules

Reference data from `.shared/data/`:
- `writing-styles.json` - Choose appropriate style
- `tone-variations.json` - Select matching tone
- `blog-structures.json` - Pick structure template
- `industry-templates.json` - Industry-specific guidance
- `marketing-blacklist.json` - Phrases to avoid

### 3. Apply Structure

Default structure (5 sections):
1. **Giới thiệu** - Context và tầm quan trọng
2. **Vấn đề thực tế** - Phân tích real-world
3. **Cách tiếp cận** - Reasoning và so sánh
4. **Ví dụ triển khai** - Code snippets cụ thể
5. **Kết luận** - Tóm tắt và action items

### 4. Validate Output

Ensure:
- [ ] All required sections present
- [ ] Valid Markdown with heading hierarchy
- [ ] No marketing phrases from blacklist
- [ ] Paragraphs ≤ 5 lines
- [ ] Code blocks have language identifiers
- [ ] Sentences 5-50 words

## Style Guidelines

### DO ✅
- Write like talking to a colleague
- Explain "why" before "how"
- Use real code examples
- Get straight to the point
- Use specific numbers over vague words

### DON'T ❌
- Use marketing/hype language
- Write paragraphs > 5 lines
- Skip heading levels
- Translate technical terms to Vietnamese
- Write abstract without examples

## File References

- Data: `../../.shared/data/`
- Scripts: `../../.shared/scripts/`
- Examples: `../../examples/`
- Templates: `../../templates/`
