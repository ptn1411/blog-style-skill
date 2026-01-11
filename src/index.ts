/**
 * AI Blog Style Skill - Main Entry Point
 * Exports all validation utilities for blog generation
 */

// Input Validator exports
export {
  TECHNOLOGY_KEYWORDS,
  validateInput,
  isEmptyInput,
  isWhitespaceOnly,
  isTooShort,
  detectTechnologyKeywords,
  isTechnicalContent,
  type InputErrorType,
  type InputValidationResult
} from './input-validator';

// Blog Validator exports
export {
  REQUIRED_SECTIONS as BLOG_REQUIRED_SECTIONS,
  MAX_PARAGRAPH_LINES,
  validateBlog,
  validateSections as validateBlogSections,
  validateHeadings,
  validateParagraphLength,
  validateCodeBlocks,
  validateMarkdownStructure as validateBlogMarkdown,
  hasAllSectionsWithContent,
  type RequiredSection,
  type SectionValidationResult,
  type HeadingValidationResult,
  type ParagraphValidationResult,
  type CodeBlockValidationResult,
  type BlogValidationResult
} from './blog-validator';

// Style Checker exports
export {
  MARKETING_BLACKLIST,
  MIN_SENTENCE_WORDS,
  MAX_SENTENCE_WORDS,
  MIN_VIETNAMESE_RATIO,
  checkStyle,
  checkMarketingPhrases,
  checkLanguageComposition,
  checkSentenceLength,
  splitIntoSentences,
  countWords,
  type MarketingPhraseResult,
  type LanguageCompositionResult,
  type SentenceLengthResult,
  type StyleCheckResult
} from './style-checker';

// Template Validator exports
export {
  REQUIRED_PLACEHOLDERS,
  REQUIRED_SECTIONS as TEMPLATE_REQUIRED_SECTIONS,
  DEFAULT_TEMPLATE,
  validateTemplate,
  validatePlaceholders,
  validateMarkdownStructure as validateTemplateMarkdown,
  validateSections as validateTemplateSections,
  substitutePlaceholders,
  type ValidationResult
} from './template-validator';
