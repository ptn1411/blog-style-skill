# Hướng dẫn Nâng cấp Blog Style Skill

Tài liệu này giúp AI hoặc developer nâng cấp skill một cách nhất quán.

---

## 📁 Cấu trúc Project

```
ai-blog-style-skill/
├── .shared/                    # Data & scripts dùng chung
│   ├── data/                   # JSON data files
│   └── scripts/                # Python scripts
├── .cursor/commands/           # Cursor AI config
├── .kiro/steering/             # Kiro AI config
├── .windsurf/workflows/        # Windsurf AI config
├── .claude/skills/             # Claude AI config
├── .codex/skills/              # Codex AI config
├── .github/prompts/            # GitHub Copilot config
├── docs/                       # Documentation
├── examples/                   # Blog examples
├── templates/                  # Blog templates
├── rules/                      # Writing rules
├── src/                        # TypeScript validators
├── cli/                        # CLI commands
└── SKILL.md                    # Main skill definition
```

---

## 🔄 Quy trình Nâng cấp

### Bước 1: Xác định loại nâng cấp

| Loại | Files cần sửa |
|------|---------------|
| Thêm data (style/tone/structure) | `.shared/data/*.json` |
| Thêm tính năng mới | Tất cả AI configs + SKILL.md |
| Sửa rules/guidelines | `rules/*.md` + AI configs |
| Thêm template | `templates/*.md` |
| Thêm example | `examples/*.md` |
| Sửa CLI | `cli/commands/*.ts` |
| Sửa validators | `src/*.ts` |

### Bước 2: Cập nhật theo thứ tự

```
1. .shared/data/          ← Data trước
2. SKILL.md               ← Main definition
3. AI configs             ← Sync tất cả AI
4. docs/                  ← Documentation
5. examples/              ← Examples nếu cần
```

---

## 📝 Prompts để AI Nâng cấp

### Thêm Data mới

```
Thêm [LOẠI DATA] mới vào blog-style skill:

Name: [TÊN]
Mô tả: [MÔ TẢ]

Yêu cầu:
- Cập nhật file JSON trong .shared/data/
- Theo đúng schema hiện có
- Xem docs/DATA_PROMPTS.md để biết schema
```

### Thêm Tính năng mới

```
Thêm tính năng [TÊN TÍNH NĂNG] vào blog-style skill.

Mô tả: [MÔ TẢ TÍNH NĂNG]

Yêu cầu:
1. Cập nhật SKILL.md với instructions mới
2. Cập nhật TẤT CẢ AI configs:
   - .cursor/commands/blog-style.md
   - .kiro/steering/blog-style.md
   - .windsurf/workflows/blog-style.md
   - .claude/skills/blog-style/SKILL.md
   - .codex/skills/blog-style/SKILL.md
   - .github/prompts/blog-style.prompt.md
3. Thêm data nếu cần vào .shared/data/
4. Cập nhật docs/ nếu cần
```

### Sửa đổi Rules

```
Sửa đổi writing rules trong blog-style skill:

Thay đổi: [MÔ TẢ THAY ĐỔI]

Yêu cầu:
1. Cập nhật rules/*.md
2. Cập nhật .shared/data/ nếu liên quan
3. Cập nhật SKILL.md
4. Sync tất cả AI configs
```

### Thêm Template mới

```
Thêm blog template mới:

Template name: [TÊN]
Mục đích: [MÔ TẢ]
Sections: [DANH SÁCH SECTIONS]

Yêu cầu:
1. Tạo file templates/[tên].md
2. Thêm vào .shared/data/blog-structures.json nếu là structure mới
3. Cập nhật docs/PROMPTS.md với hướng dẫn sử dụng
```

### Nâng cấp CLI

```
Thêm/sửa CLI command:

Command: [TÊN COMMAND]
Chức năng: [MÔ TẢ]

Yêu cầu:
1. Tạo/sửa file cli/commands/[command].ts
2. Cập nhật cli/index.ts nếu thêm command mới
3. Cập nhật README.md với usage mới
```

---

## 🔗 Sync AI Configs

### Khi nào cần sync?

- Thêm tính năng mới
- Thay đổi workflow/process
- Thêm data source mới
- Thay đổi output format

### Prompt để sync

```
Sync tất cả AI configs với thay đổi sau:

Thay đổi: [MÔ TẢ]

Cập nhật các files:
- .cursor/commands/blog-style.md (format: slash command)
- .kiro/steering/blog-style.md (format: steering với file references)
- .windsurf/workflows/blog-style.md (format: workflow steps)
- .claude/skills/blog-style/SKILL.md (format: skill)
- .codex/skills/blog-style/SKILL.md (format: skill)
- .github/prompts/blog-style.prompt.md (format: prompt)

Giữ nguyên format riêng của từng AI, chỉ thêm nội dung mới.
```

---

## 📋 Checklist Nâng cấp

### Trước khi nâng cấp
- [ ] Đọc SKILL.md hiểu cấu trúc hiện tại
- [ ] Xác định files cần sửa
- [ ] Backup nếu cần

### Sau khi nâng cấp
- [ ] Data JSON valid (không lỗi syntax)
- [ ] SKILL.md đã cập nhật
- [ ] Tất cả AI configs đã sync
- [ ] Docs đã cập nhật
- [ ] Test với CLI: `blog-style validate`
- [ ] Thử viết blog với tính năng mới

---

## 🏷️ Versioning

Cập nhật version trong SKILL.md frontmatter:

```yaml
---
version: 2.1.0  # Major.Minor.Patch
---
```

| Loại | Khi nào |
|------|---------|
| Major (3.0.0) | Breaking changes, thay đổi lớn |
| Minor (2.1.0) | Thêm tính năng mới |
| Patch (2.0.1) | Bug fixes, sửa nhỏ |

---

## 💡 Tips

1. **Luôn sync AI configs** - Đừng quên update tất cả AI
2. **Test sau khi sửa** - Dùng CLI validate
3. **Giữ backward compatible** - Tránh breaking changes
4. **Document changes** - Ghi lại trong docs/
5. **Dùng prompts có sẵn** - Xem docs/DATA_PROMPTS.md

---

## 📚 Files Reference

| File | Mục đích |
|------|----------|
| `SKILL.md` | Main skill definition |
| `docs/PROMPTS.md` | Prompts viết blog |
| `docs/DATA_PROMPTS.md` | Prompts thêm data |
| `docs/UPGRADE_GUIDE.md` | File này |
| `docs/TUTORIAL.md` | Tutorial sử dụng |
| `docs/FRONTMATTER_GUIDE.md` | Hướng dẫn frontmatter |
