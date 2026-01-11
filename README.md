# AI Blog Style Skill

Một skill giúp AI viết blog theo phong cách cá nhân - gần gũi, rõ ràng, tư duy kỹ sư.

## Features

- **6 Writing Styles** - Conversational, Technical, Storytelling, Analytical, Tutorial, Opinion
- **5 Tone Variations** - Friendly, Professional, Educational, Enthusiastic, Pragmatic
- **6 Blog Structures** - Standard, Listicle, Case Study, Comparison, Tutorial, Opinion Piece
- **6 Industry Templates** - SaaS, Fintech, E-commerce, DevTools, AI/ML, Startup
- **Multi-platform Support** - Claude, Cursor, Windsurf, Copilot, Kiro, Codex
- **CLI Tools** - Search, validate, install commands

## Installation

```bash
# Install globally
npm install -g ai-blog-style-skill

# Or install locally
npm install ai-blog-style-skill
```

## CLI Usage

### `blog-style init`

Khởi tạo skill trong project hiện tại.

```bash
blog-style init
```

Interactive setup sẽ hỏi:
- Project name
- Preferred tone (friendly, professional, educational...)
- Preferred structure (standard, listicle, case-study...)
- Industry (saas, fintech, devtools...)

Output:
```
🚀 Initializing AI Blog Style Skill

Answer a few questions to customize your setup:

Project name: (my-blog) my-tech-blog
Preferred tone: (friendly) friendly
Preferred structure: (standard) tutorial
Industry: (none) devtools

📁 Creating files...
   ✓ .blog-style.json
   ✓ SKILL.md
   ✓ .shared/data/

✅ Initialization complete!
```

Options:
- `--force`, `-f` - Ghi đè files đã tồn tại

---

### `blog-style search <query>`

Tìm kiếm trong database (styles, tones, structures, industries, blacklist).

```bash
# Tìm kiếm chung
blog-style search tutorial

# Tìm theo type cụ thể
blog-style search saas --type industry
blog-style search friendly --type tone

# Output JSON
blog-style search react --json
```

Output:
```
🔍 Search Results for: "tutorial"
   Found 3 matches

📝 Writing Styles:
   • Tutorial (Hướng dẫn)
     Step-by-step instructional content with clear outcomes

📋 Blog Structures:
   • Step-by-Step Tutorial (Hướng dẫn từng bước)
     Sections: Tổng quan → Yêu cầu → Các bước thực hiện → Xử lý lỗi → Bước tiếp theo
```

Options:
- `--type`, `-t` - Filter theo type: `style`, `tone`, `structure`, `industry`, `blacklist`
- `--json`, `-j` - Output dạng JSON

---

### `blog-style list [type]`

Liệt kê tất cả data có sẵn.

```bash
# Liệt kê tất cả
blog-style list

# Liệt kê theo type
blog-style list style
blog-style list tone
blog-style list structure
blog-style list industry
blog-style list blacklist

# Output JSON
blog-style list style --json
```

Output:
```
📚 AI Blog Style Skill - Available Data

📝 Writing Styles (6)
──────────────────────────────────────────────────
  conversational  Conversational (Gần gũi)
                  Write like talking to a colleague, friendly and approachable
                  Best for: tutorials, personal blogs, developer stories

  technical       Technical (Kỹ thuật)
                  Precise, detailed, focused on accuracy and completeness
                  Best for: documentation, API guides, architecture posts

🎭 Tone Variations (5)
──────────────────────────────────────────────────
  friendly        Friendly (Thân thiện)
                  Warm, approachable, like talking to a friend

  professional    Professional (Chuyên nghiệp)
                  Polished, authoritative, suitable for business contexts

📊 Summary:
   • 6 Writing Styles
   • 5 Tone Variations
   • 6 Blog Structures
   • 6 Industry Templates
   • 7 Blacklist Categories
```

Options:
- `--json`, `-j` - Output dạng JSON

---

### `blog-style validate <file>`

Validate blog post theo style rules.

```bash
# Validate cơ bản
blog-style validate my-blog.md

# Strict mode (exit code 1 nếu fail)
blog-style validate my-blog.md --strict

# Output JSON
blog-style validate my-blog.md --json
```

Output:
```
📄 Validating: my-blog.md

────────────────────────────────────────────────────────────

✅ PASSED - Blog meets all style requirements

📋 Section Validation:
   ✓ All required sections present
   Present: Giới thiệu, Vấn đề thực tế, Cách tiếp cận, Ví dụ triển khai, Kết luận

📑 Heading Validation:
   ✓ Valid heading structure
   H1: Yes, H2 count: 5

📝 Paragraph Validation:
   ✓ All paragraphs within 5 lines

💻 Code Block Validation:
   ✓ All code blocks have language identifiers
   Code blocks found: 3

🚫 Marketing Phrase Check:
   ✓ No marketing phrases found

🌐 Language Composition:
   ✓ Vietnamese ratio: 85.2% (min 80%)

📏 Sentence Length:
   ✓ All sentences within 5-50 words

────────────────────────────────────────────────────────────

📊 Summary:
   Errors: 0
   Warnings: 0
```

Nếu có lỗi:
```
❌ FAILED - Blog has validation issues

📋 Section Validation:
   ✗ Missing sections:
     - Kết luận

🚫 Marketing Phrase Check:
   ✗ Found 2 marketing phrase(s):
     Line 15: "tốt nhất"
     Line 28: "đột phá"

📊 Summary:
   Errors: 3
   Warnings: 1
```

Options:
- `--strict`, `-s` - Exit code 1 nếu validation fail (dùng cho CI/CD)
- `--json`, `-j` - Output dạng JSON

---

### `blog-style install [platform]`

Cài đặt skill files cho AI platform.

```bash
# Xem danh sách platforms
blog-style install

# Cài cho platform cụ thể
blog-style install cursor
blog-style install claude
blog-style install kiro
blog-style install copilot
blog-style install windsurf
blog-style install codex

# Cài cho tất cả platforms
blog-style install --all

# Cài vào thư mục khác
blog-style install --all --dest ./my-project
```

Output:
```
📦 Installing AI Blog Style Skill

   Destination: /path/to/project

📁 Installing shared data files...
   ✓ .shared/data/writing-styles.json
   ✓ .shared/data/tone-variations.json
   ✓ .shared/data/blog-structures.json
   ✓ .shared/data/industry-templates.json
   ✓ .shared/data/marketing-blacklist.json
   ✓ .shared/data/formatting-rules.json
   ✓ .shared/scripts/search.py

📦 Installing for Cursor...
   ✓ .cursor/commands/blog-style.md

✅ Installation complete!

Next steps:
   1. Open your AI assistant
   2. Request to write a blog
   3. The skill will activate automatically
```

Supported platforms:
| Platform | Files |
|----------|-------|
| `claude` | `.claude/skills/blog-style/SKILL.md` |
| `cursor` | `.cursor/commands/blog-style.md` |
| `windsurf` | `.windsurf/workflows/blog-style.md` |
| `copilot` | `.github/prompts/blog-style.prompt.md` |
| `kiro` | `.kiro/steering/blog-style.md` |
| `codex` | `.codex/skills/blog-style/SKILL.md` |

Options:
- `--all`, `-a` - Cài cho tất cả platforms
- `--dest`, `-d` - Thư mục đích (default: `.`)

---

## Quick Start

```bash
# 1. Install CLI
npm install -g ai-blog-style-skill

# 2. Initialize trong project
cd my-project
blog-style init

# 3. Install cho AI platform bạn dùng
blog-style install cursor

# 4. Bắt đầu viết blog với AI assistant
# Mở Cursor và yêu cầu: "Viết blog về React hooks"
```

## Workflow Example

```bash
# 1. Tìm style phù hợp
blog-style search tutorial
blog-style list structure

# 2. Viết blog với AI (sử dụng skill đã install)

# 3. Validate blog đã viết
blog-style validate my-blog.md

# 4. Fix issues nếu có và validate lại
blog-style validate my-blog.md --strict
```

## CI/CD Integration

```yaml
# .github/workflows/validate-blog.yml
name: Validate Blog Posts

on:
  push:
    paths:
      - 'content/**/*.md'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install blog-style CLI
        run: npm install -g ai-blog-style-skill
      
      - name: Validate blog posts
        run: |
          for file in content/**/*.md; do
            blog-style validate "$file" --strict
          done
```

## Data Structure

```
.shared/
├── data/
│   ├── writing-styles.json     # 6 writing styles
│   ├── tone-variations.json    # 5 tone variations
│   ├── blog-structures.json    # 6 blog structures
│   ├── industry-templates.json # 6 industry templates
│   ├── marketing-blacklist.json # 7 blacklist categories
│   └── formatting-rules.json   # Formatting rules
└── scripts/
    └── search.py               # Python search script
```

## TypeScript API

```typescript
import { 
  validateInput, 
  validateBlog, 
  checkStyle, 
  validateTemplate 
} from 'ai-blog-style-skill';

// Validate input topic
const inputResult = validateInput('Chủ đề blog');
if (!inputResult.valid) {
  console.log(inputResult.error?.message);
}

// Validate blog structure
const blogResult = validateBlog(markdownContent);
console.log(blogResult.sections.missingSections);

// Check style compliance
const styleResult = checkStyle(markdownContent);
console.log(styleResult.marketingPhrases.foundPhrases);
```

## License

MIT
