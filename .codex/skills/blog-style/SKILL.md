---
name: blog-writer-myvoice
description: Write blog posts in personal Vietnamese style
version: 2.0.0
---

# Blog Style Skill

Skill viết blog theo phong cách cá nhân - gần gũi, rõ ràng, tư duy kỹ sư.

## Activation

Activates for:
- Blog writing requests
- Technical article creation
- Personal style content

## Data Sources

Located in `../../.shared/data/`:

- **writing-styles.json**: 6 styles (conversational, technical, storytelling, analytical, tutorial, opinion)
- **tone-variations.json**: 5 tones (friendly, professional, educational, enthusiastic, pragmatic)
- **blog-structures.json**: 6 structures (standard, listicle, case-study, comparison, tutorial, opinion)
- **industry-templates.json**: 6 industries (SaaS, Fintech, E-commerce, DevTools, AI/ML, Startup)
- **marketing-blacklist.json**: 7 categories of phrases to avoid

## Search

```bash
python ../../.shared/scripts/search.py <query>
```

## Default Structure

1. **Giới thiệu** - Context và tầm quan trọng
2. **Vấn đề thực tế** - Phân tích real-world
3. **Cách tiếp cận** - Reasoning và so sánh
4. **Ví dụ triển khai** - Code snippets
5. **Kết luận** - Tóm tắt và action items

## Formatting Rules

- Paragraphs: ≤ 5 lines
- Sentences: 5-50 words
- Headings: H1 → H2 → H3
- Code: Always specify language
- Language: Vietnamese + English tech terms

## Style

### DO ✅
- Conversational tone
- Explain "why" first
- Real code examples
- Direct and concise

### DON'T ❌
- Marketing language
- Long paragraphs
- Skip heading levels
- Translate tech terms

## Validation

Use TypeScript utilities:
```typescript
import { validateBlog, checkStyle } from '../../src';

const result = validateBlog(content);
const style = checkStyle(content);
```
