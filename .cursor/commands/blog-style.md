# Blog Style Skill

Write blog posts in personal Vietnamese style - gần gũi, rõ ràng, tư duy kỹ sư.

## Usage

Type `/blog-style` followed by your topic:

```
/blog-style Cách optimize React performance
```

## How It Works

1. **Search** - Finds relevant styles, tones, templates from `.shared/data/`
2. **Apply** - Uses matching writing style and structure
3. **Generate** - Creates blog with 5 standard sections
4. **Validate** - Checks formatting and blacklist compliance

## Data Sources

- `.shared/data/writing-styles.json` - 6 writing styles
- `.shared/data/tone-variations.json` - 5 tone options
- `.shared/data/blog-structures.json` - 6 structure templates
- `.shared/data/industry-templates.json` - 6 industry guides
- `.shared/data/marketing-blacklist.json` - Phrases to avoid

## Output Structure

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

## Style Rules

- Tone: Friendly, clear, no fluff
- Language: Vietnamese primary, English tech terms
- Paragraphs: Max 5 lines
- Sentences: 5-50 words
- Code: Always with language identifier

## Search Script

```bash
python .shared/scripts/search.py tutorial
python .shared/scripts/search.py saas
python .shared/scripts/search.py friendly
```
