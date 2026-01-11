/**
 * Init command - Initialize blog-style skill in current project
 */

import chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';

interface InitOptions {
  force?: boolean;
}

const TEMPLATES = {
  skillMd: `---
name: blog-writer-myvoice
description: Write blog posts in personal style
version: 1.0.0
---

# My Blog Style Skill

Custom blog writing skill based on AI Blog Style Skill.

## Activation

This skill activates when:
- User requests to write a blog
- Content relates to technology/programming

## Instructions

1. Load writing rules from \`.shared/data/\`
2. Apply structure and formatting
3. Validate output

## Style Guidelines

### DO ✅
- Write conversationally
- Use real examples
- Be direct and clear

### DON'T ❌
- Use marketing language
- Write long paragraphs
- Skip heading levels
`,

  customRules: `{
  "customRules": {
    "tone": "friendly",
    "structure": "standard",
    "industry": null,
    "maxParagraphLines": 5,
    "minSentenceWords": 5,
    "maxSentenceWords": 50,
    "requireCodeLanguage": true
  },
  "blacklistExtensions": [],
  "whitelistPhrases": []
}
`
};

export async function init(options: InitOptions): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.cyan('\n🚀 Initializing AI Blog Style Skill\n'));

  // Check if already initialized
  const configPath = path.join(cwd, '.blog-style.json');
  if (fs.existsSync(configPath) && !options.force) {
    console.log(chalk.yellow('⚠ Project already initialized.'));
    console.log(chalk.gray('   Use --force to reinitialize.\n'));
    return;
  }

  // Interactive setup
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt: string): Promise<string> => {
    return new Promise(resolve => {
      rl.question(prompt, resolve);
    });
  };

  try {
    console.log(chalk.gray('Answer a few questions to customize your setup:\n'));

    // Project name
    const projectName = await question(chalk.white('Project name: ') + chalk.gray('(my-blog) '));
    const name = projectName.trim() || 'my-blog';

    // Preferred tone
    console.log(chalk.gray('\nAvailable tones: friendly, professional, educational, enthusiastic, pragmatic'));
    const toneInput = await question(chalk.white('Preferred tone: ') + chalk.gray('(friendly) '));
    const tone = toneInput.trim() || 'friendly';

    // Preferred structure
    console.log(chalk.gray('\nAvailable structures: standard, listicle, case-study, comparison, tutorial, opinion'));
    const structureInput = await question(chalk.white('Preferred structure: ') + chalk.gray('(standard) '));
    const structure = structureInput.trim() || 'standard';

    // Industry
    console.log(chalk.gray('\nAvailable industries: saas, fintech, ecommerce, devtools, ai-ml, startup (or leave empty)'));
    const industryInput = await question(chalk.white('Industry: ') + chalk.gray('(none) '));
    const industry = industryInput.trim() || null;

    rl.close();

    // Create config file
    const config = {
      name,
      version: '1.0.0',
      customRules: {
        tone,
        structure,
        industry,
        maxParagraphLines: 5,
        minSentenceWords: 5,
        maxSentenceWords: 50,
        requireCodeLanguage: true
      },
      blacklistExtensions: [],
      whitelistPhrases: []
    };

    console.log(chalk.gray('\n─'.repeat(50)));
    console.log(chalk.bold('\n📁 Creating files...\n'));

    // Create config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.green('   ✓ .blog-style.json'));

    // Create SKILL.md if not exists
    const skillPath = path.join(cwd, 'SKILL.md');
    if (!fs.existsSync(skillPath) || options.force) {
      fs.writeFileSync(skillPath, TEMPLATES.skillMd);
      console.log(chalk.green('   ✓ SKILL.md'));
    }

    // Create .shared directory structure
    const sharedDataDir = path.join(cwd, '.shared', 'data');
    if (!fs.existsSync(sharedDataDir)) {
      fs.mkdirSync(sharedDataDir, { recursive: true });
      console.log(chalk.green('   ✓ .shared/data/'));
    }

    console.log(chalk.green.bold('\n✅ Initialization complete!\n'));
    
    console.log(chalk.bold('Configuration:'));
    console.log(chalk.gray(`   Name: ${name}`));
    console.log(chalk.gray(`   Tone: ${tone}`));
    console.log(chalk.gray(`   Structure: ${structure}`));
    console.log(chalk.gray(`   Industry: ${industry || 'none'}`));
    
    console.log(chalk.bold('\nNext steps:'));
    console.log(chalk.gray('   1. Run: blog-style install --all'));
    console.log(chalk.gray('   2. Customize .blog-style.json as needed'));
    console.log(chalk.gray('   3. Start writing blogs with your AI assistant\n'));

  } catch (error) {
    rl.close();
    console.log(chalk.red('\n❌ Initialization failed\n'));
    throw error;
  }
}
