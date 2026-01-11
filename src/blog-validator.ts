/**
 * Blog Validator
 * Validates generated blog posts for structure, formatting, and quality
 * Requirements: 3.1-3.6, 4.1, 4.2, 4.4, 7.1, 7.4
 */

/**
 * Required sections in a blog post (Vietnamese)
 */
export const REQUIRED_SECTIONS = [
  'Giới thiệu',
  'Vấn đề thực tế',
  'Cách tiếp cận',
  'Ví dụ triển khai',
  'Kết luận'
] as const;

export type RequiredSection = typeof REQUIRED_SECTIONS[number];

export interface SectionValidationResult {
  valid: boolean;
  presentSections: string[];
  missingSections: string[];
}

export interface HeadingValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  hasH1Title: boolean;
  h2Count: number;
}

export interface ParagraphValidationResult {
  valid: boolean;
  errors: string[];
  longParagraphs: Array<{
    lineNumber: number;
    lineCount: number;
    preview: string;
  }>;
}

export interface CodeBlockValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  codeBlocks: Array<{
    lineNumber: number;
    language: string | null;
    hasLanguage: boolean;
  }>;
}

export interface BlogValidationResult {
  valid: boolean;
  sections: SectionValidationResult;
  headings: HeadingValidationResult;
  paragraphs: ParagraphValidationResult;
  codeBlocks: CodeBlockValidationResult;
  errors: string[];
  warnings: string[];
}

/**
 * Maximum number of lines allowed per paragraph
 */
export const MAX_PARAGRAPH_LINES = 5;

/**
 * Validates that all required sections are present in the blog
 */
export function validateSections(content: string): SectionValidationResult {
  const presentSections: string[] = [];
  const missingSections: string[] = [];

  for (const section of REQUIRED_SECTIONS) {
    // Check for H2 heading with section name
    const sectionRegex = new RegExp(`^## ${escapeRegex(section)}`, 'm');
    if (sectionRegex.test(content)) {
      presentSections.push(section);
    } else {
      missingSections.push(section);
    }
  }

  return {
    valid: missingSections.length === 0,
    presentSections,
    missingSections
  };
}


/**
 * Validates Markdown heading structure and hierarchy
 */
export function validateHeadings(content: string): HeadingValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lines = content.split('\n');

  // Check for H1 title
  const h1Lines = lines.filter(line => /^# [^#]/.test(line));
  const hasH1Title = h1Lines.length > 0;

  if (!hasH1Title) {
    errors.push('Blog must have an H1 title');
  } else if (h1Lines.length > 1) {
    warnings.push('Blog has multiple H1 headings, should have only one');
  }

  // Count H2 sections
  const h2Lines = lines.filter(line => /^## [^#]/.test(line));
  const h2Count = h2Lines.length;

  if (h2Count < 5) {
    errors.push(`Blog must have at least 5 H2 sections, found ${h2Count}`);
  }

  // Check heading hierarchy (no skipping levels)
  let lastHeadingLevel = 0;
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track code blocks to ignore headings inside them
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const headingMatch = line.match(/^(#{1,6}) /);
    if (headingMatch) {
      const level = headingMatch[1].length;
      
      // Check for hierarchy skip (e.g., H1 to H3 without H2)
      if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
        warnings.push(
          `Heading hierarchy skip at line ${i + 1}: H${lastHeadingLevel} to H${level}`
        );
      }
      
      lastHeadingLevel = level;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    hasH1Title,
    h2Count
  };
}

/**
 * Validates paragraph length (max 5 lines per paragraph)
 */
export function validateParagraphLength(content: string): ParagraphValidationResult {
  const errors: string[] = [];
  const longParagraphs: Array<{
    lineNumber: number;
    lineCount: number;
    preview: string;
  }> = [];

  const lines = content.split('\n');
  let paragraphStart = -1;
  let paragraphLineCount = 0;
  let inCodeBlock = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Track code blocks
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      // End current paragraph if any
      if (paragraphLineCount > 0) {
        checkParagraph();
      }
      paragraphStart = -1;
      paragraphLineCount = 0;
      continue;
    }

    if (inCodeBlock) continue;

    // Check if line is a list item
    const isListItem = /^[-*+]\s|^\d+\.\s/.test(trimmedLine);
    
    // Check if line is a heading
    const isHeading = /^#{1,6}\s/.test(trimmedLine);

    // Empty line ends paragraph
    if (trimmedLine === '') {
      if (paragraphLineCount > 0) {
        checkParagraph();
      }
      paragraphStart = -1;
      paragraphLineCount = 0;
      inList = false;
      continue;
    }

    // Headings end paragraph and don't count as paragraph content
    if (isHeading) {
      if (paragraphLineCount > 0) {
        checkParagraph();
      }
      paragraphStart = -1;
      paragraphLineCount = 0;
      inList = false;
      continue;
    }

    // List items are not counted as paragraph lines
    if (isListItem) {
      if (paragraphLineCount > 0 && !inList) {
        checkParagraph();
        paragraphStart = -1;
        paragraphLineCount = 0;
      }
      inList = true;
      continue;
    }

    // Regular paragraph line
    if (!inList) {
      if (paragraphStart === -1) {
        paragraphStart = i;
      }
      paragraphLineCount++;
    }
  }

  // Check final paragraph
  if (paragraphLineCount > 0) {
    checkParagraph();
  }

  function checkParagraph() {
    if (paragraphLineCount > MAX_PARAGRAPH_LINES) {
      const preview = lines[paragraphStart].substring(0, 50) + 
        (lines[paragraphStart].length > 50 ? '...' : '');
      
      longParagraphs.push({
        lineNumber: paragraphStart + 1,
        lineCount: paragraphLineCount,
        preview
      });
      
      errors.push(
        `Paragraph at line ${paragraphStart + 1} has ${paragraphLineCount} lines (max ${MAX_PARAGRAPH_LINES})`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    longParagraphs
  };
}


/**
 * Validates code blocks have syntax highlighting language identifiers
 */
export function validateCodeBlocks(content: string): CodeBlockValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const codeBlocks: Array<{
    lineNumber: number;
    language: string | null;
    hasLanguage: boolean;
  }> = [];

  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for code block start
    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || null;
      const hasLanguage = language !== null && language !== '';
      
      codeBlocks.push({
        lineNumber: i + 1,
        language,
        hasLanguage
      });

      if (!hasLanguage) {
        errors.push(
          `Code block at line ${i + 1} is missing language identifier for syntax highlighting`
        );
      }
    }
  }

  // Filter to only opening code blocks (every other one starting from first)
  const openingBlocks = codeBlocks.filter((_, index) => index % 2 === 0);

  return {
    valid: openingBlocks.every(block => block.hasLanguage),
    errors: errors.filter((_, index) => index % 2 === 0), // Only errors for opening blocks
    warnings,
    codeBlocks: openingBlocks
  };
}

/**
 * Validates that content is valid Markdown
 * Basic validation for common Markdown issues
 */
export function validateMarkdownStructure(content: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const lines = content.split('\n');
  
  let codeBlockCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Count code block markers
    if (line.startsWith('```')) {
      codeBlockCount++;
    }
  }

  // Check for unclosed code blocks
  if (codeBlockCount % 2 !== 0) {
    errors.push('Unclosed code block detected');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Full blog validation combining all checks
 */
export function validateBlog(content: string): BlogValidationResult {
  const sections = validateSections(content);
  const headings = validateHeadings(content);
  const paragraphs = validateParagraphLength(content);
  const codeBlocks = validateCodeBlocks(content);
  const markdown = validateMarkdownStructure(content);

  const allErrors = [
    ...sections.missingSections.map(s => `Missing required section: ${s}`),
    ...headings.errors,
    ...paragraphs.errors,
    ...codeBlocks.errors,
    ...markdown.errors
  ];

  const allWarnings = [
    ...headings.warnings,
    ...codeBlocks.warnings
  ];

  return {
    valid: sections.valid && headings.valid && paragraphs.valid && codeBlocks.valid && markdown.valid,
    sections,
    headings,
    paragraphs,
    codeBlocks,
    errors: allErrors,
    warnings: allWarnings
  };
}

/**
 * Checks if a blog has all required sections with non-empty content
 */
export function hasAllSectionsWithContent(content: string): boolean {
  const lines = content.split('\n');
  let inCodeBlock = false;
  
  for (const section of REQUIRED_SECTIONS) {
    const sectionRegex = new RegExp(`^## ${escapeRegex(section)}$`);
    let foundSection = false;
    let hasContent = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      
      if (inCodeBlock) continue;
      
      if (sectionRegex.test(line.trim())) {
        foundSection = true;
        // Check if there's content after this section before next heading
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine.startsWith('#')) break; // Next heading
          if (nextLine !== '' && !nextLine.startsWith('```')) {
            hasContent = true;
            break;
          }
        }
        break;
      }
    }
    
    if (!foundSection || !hasContent) {
      return false;
    }
  }
  
  return true;
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
