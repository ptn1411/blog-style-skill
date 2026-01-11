/**
 * Template Validator
 * Validates blog templates have all required placeholders and valid Markdown structure
 * Requirements: 5.1, 5.2
 */

export const REQUIRED_PLACEHOLDERS = [
  '{{TITLE}}',
  '{{INTRODUCTION}}',
  '{{PROBLEM}}',
  '{{APPROACH}}',
  '{{EXAMPLES}}',
  '{{CONCLUSION}}'
] as const;

export const REQUIRED_SECTIONS = [
  'Giới thiệu',
  'Vấn đề thực tế',
  'Cách tiếp cận',
  'Ví dụ triển khai',
  'Kết luận'
] as const;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates that a template contains all required placeholders
 */
export function validatePlaceholders(template: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const placeholder of REQUIRED_PLACEHOLDERS) {
    if (!template.includes(placeholder)) {
      errors.push(`Missing required placeholder: ${placeholder}`);
    }
  }

  // Check for duplicate placeholders (warning only)
  for (const placeholder of REQUIRED_PLACEHOLDERS) {
    const matches = template.match(new RegExp(escapeRegex(placeholder), 'g'));
    if (matches && matches.length > 1) {
      warnings.push(`Duplicate placeholder found: ${placeholder}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates Markdown structure of a template
 */
export function validateMarkdownStructure(template: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lines = template.split('\n');

  // Check for H1 title (should have exactly one)
  const h1Lines = lines.filter(line => /^# [^#]/.test(line));
  if (h1Lines.length === 0) {
    errors.push('Template must have an H1 title');
  } else if (h1Lines.length > 1) {
    warnings.push('Template has multiple H1 headings');
  }

  // Check for H2 section headings
  const h2Lines = lines.filter(line => /^## [^#]/.test(line));
  if (h2Lines.length < 5) {
    errors.push(`Template must have at least 5 H2 sections, found ${h2Lines.length}`);
  }

  // Check heading hierarchy (no H3 before H2, etc.)
  let lastHeadingLevel = 0;
  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6}) /);
    if (headingMatch) {
      const level = headingMatch[1].length;
      if (level > lastHeadingLevel + 1 && lastHeadingLevel > 0) {
        warnings.push(`Heading hierarchy skip detected: H${lastHeadingLevel} to H${level}`);
      }
      lastHeadingLevel = level;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates that all required sections are present
 */
export function validateSections(template: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const section of REQUIRED_SECTIONS) {
    if (!template.includes(`## ${section}`)) {
      errors.push(`Missing required section: ${section}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Full template validation combining all checks
 */
export function validateTemplate(template: string): ValidationResult {
  const placeholderResult = validatePlaceholders(template);
  const markdownResult = validateMarkdownStructure(template);
  const sectionResult = validateSections(template);

  return {
    valid: placeholderResult.valid && markdownResult.valid && sectionResult.valid,
    errors: [
      ...placeholderResult.errors,
      ...markdownResult.errors,
      ...sectionResult.errors
    ],
    warnings: [
      ...placeholderResult.warnings,
      ...markdownResult.warnings,
      ...sectionResult.warnings
    ]
  };
}

/**
 * Substitutes placeholders in template with provided values
 */
export function substitutePlaceholders(
  template: string,
  values: Record<string, string>
): string {
  let result = template;
  
  for (const [key, value] of Object.entries(values)) {
    const placeholder = `{{${key.toUpperCase()}}}`;
    result = result.replace(new RegExp(escapeRegex(placeholder), 'g'), value);
  }
  
  return result;
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Default embedded template for fallback
 */
export const DEFAULT_TEMPLATE = `# {{TITLE}}

## Giới thiệu

{{INTRODUCTION}}

## Vấn đề thực tế

{{PROBLEM}}

## Cách tiếp cận

{{APPROACH}}

## Ví dụ triển khai

{{EXAMPLES}}

## Kết luận

{{CONCLUSION}}
`;
