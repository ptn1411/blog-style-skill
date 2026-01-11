# Blog Style Skill

Write blog posts in personal Vietnamese style - gần gũi, rõ ràng, tư duy kỹ sư.

## Instructions

When user requests to write a blog:

1. **Search for relevant data** using `.shared/scripts/search.py`
2. **Select appropriate style** from `.shared/data/writing-styles.json`
3. **Choose matching tone** from `.shared/data/tone-variations.json`
4. **Apply structure** from `.shared/data/blog-structures.json`
5. **Check industry template** from `.shared/data/industry-templates.json`
6. **Avoid phrases** listed in `.shared/data/marketing-blacklist.json`

## Default Output Structure

```markdown
# [Title]

## Giới thiệu
[Context and importance of the topic]

## Vấn đề thực tế
[Real-world analysis and common mistakes]

## Cách tiếp cận
[Reasoning and comparison of options]

## Ví dụ triển khai
[Concrete code examples or case studies]

## Kết luận
[Summary and actionable next steps]
```

## Style Rules

| Rule | Value |
|------|-------|
| Tone | Friendly, clear, no fluff |
| Language | Vietnamese primary, English tech terms |
| Paragraphs | Max 5 lines |
| Sentences | 5-50 words |
| Code blocks | Always with language identifier |
| Headings | H1 → H2 → H3 hierarchy |

## DO ✅

- Write like talking to a colleague
- Explain "why" before "how"
- Use real code examples
- Get straight to the point
- Use specific numbers over vague words

## DON'T ❌

- Use marketing/hype language
- Write paragraphs > 5 lines
- Skip heading levels (H1 → H3)
- Translate technical terms to Vietnamese
- Write abstract without examples

## Available Data

- 6 Writing Styles: conversational, technical, storytelling, analytical, tutorial, opinion
- 5 Tones: friendly, professional, educational, enthusiastic, pragmatic
- 6 Structures: standard, listicle, case-study, comparison, tutorial, opinion
- 6 Industries: SaaS, Fintech, E-commerce, DevTools, AI/ML, Startup
- 7 Blacklist Categories: superlatives, hype words, empty promises, urgency, vague qualifiers, sales language, tech buzzwords
