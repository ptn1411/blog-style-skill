# Blog Style Workflow

Write blog posts in personal Vietnamese style - gần gũi, rõ ràng, tư duy kỹ sư.

## Trigger

This workflow activates when:
- User requests to write a blog or article
- Content relates to technology/programming
- User wants personal, non-formal writing style

## Workflow Steps

### Step 1: Analyze Request

Identify:
- Topic/subject matter
- Target audience
- Preferred style (if specified)
- Industry context

### Step 2: Search Data

```bash
python .shared/scripts/search.py <topic>
```

### Step 3: Select Configuration

From `.shared/data/`:
- **Style**: Choose from 6 writing styles
- **Tone**: Select from 5 tone variations
- **Structure**: Pick from 6 blog structures
- **Industry**: Apply industry-specific guidance

### Step 4: Generate Content

Apply selected configuration to generate blog with:
- Clear heading hierarchy (H1 → H2 → H3)
- Short paragraphs (≤ 5 lines)
- Code examples with language identifiers
- Vietnamese primary, English tech terms

### Step 5: Validate Output

Check against:
- Required sections present
- No marketing phrases from blacklist
- Formatting rules compliance
- Sentence length bounds (5-50 words)

## Data Files

| File | Content |
|------|---------|
| `writing-styles.json` | 6 styles |
| `tone-variations.json` | 5 tones |
| `blog-structures.json` | 6 structures |
| `industry-templates.json` | 6 industries |
| `marketing-blacklist.json` | 7 categories |
| `formatting-rules.json` | Rules |

## Output Template

```markdown
# [Title]

## Giới thiệu
[Context and importance]

## Vấn đề thực tế
[Real-world analysis]

## Cách tiếp cận
[Reasoning and comparisons]

## Ví dụ triển khai
[Code examples]

## Kết luận
[Summary and action items]
```

## Style Guidelines

### DO ✅
- Write conversationally
- Explain "why" before "how"
- Use real code examples
- Be direct and concise

### DON'T ❌
- Use marketing language
- Write long paragraphs
- Skip heading levels
- Translate tech terms
