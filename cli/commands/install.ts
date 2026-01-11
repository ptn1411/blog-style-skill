/**
 * Install command - Install skill files for AI platforms
 */

import chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface InstallOptions {
  all?: boolean;
  dest?: string;
}

type Platform = 'claude' | 'cursor' | 'windsurf' | 'copilot' | 'kiro' | 'codex';

const PLATFORMS: Record<Platform, { name: string; files: { src: string; dest: string }[] }> = {
  claude: {
    name: 'Claude Code',
    files: [
      { src: '.claude/skills/blog-style/SKILL.md', dest: '.claude/skills/blog-style/SKILL.md' }
    ]
  },
  cursor: {
    name: 'Cursor',
    files: [
      { src: '.cursor/commands/blog-style.md', dest: '.cursor/commands/blog-style.md' }
    ]
  },
  windsurf: {
    name: 'Windsurf',
    files: [
      { src: '.windsurf/workflows/blog-style.md', dest: '.windsurf/workflows/blog-style.md' }
    ]
  },
  copilot: {
    name: 'GitHub Copilot',
    files: [
      { src: '.github/prompts/blog-style.prompt.md', dest: '.github/prompts/blog-style.prompt.md' }
    ]
  },
  kiro: {
    name: 'Kiro',
    files: [
      { src: '.kiro/steering/blog-style.md', dest: '.kiro/steering/blog-style.md' }
    ]
  },
  codex: {
    name: 'Codex',
    files: [
      { src: '.codex/skills/blog-style/SKILL.md', dest: '.codex/skills/blog-style/SKILL.md' }
    ]
  }
};

const SHARED_FILES = [
  '.shared/data/writing-styles.json',
  '.shared/data/tone-variations.json',
  '.shared/data/blog-structures.json',
  '.shared/data/industry-templates.json',
  '.shared/data/marketing-blacklist.json',
  '.shared/data/formatting-rules.json',
  '.shared/scripts/search.py'
];

/**
 * Find the package root by looking for package.json
 */
function findPackageRoot(): string {
  let dir = __dirname;
  // Walk up from __dirname until we find package.json
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  // Fallback to relative path from dist/cli/commands
  return path.resolve(__dirname, '../../..');
}

export async function install(platform: string | undefined, options: InstallOptions): Promise<void> {
  const destDir = path.resolve(options.dest || '.');
  const validPlatforms = Object.keys(PLATFORMS) as Platform[];

  // Show available platforms if none specified
  if (!platform && !options.all) {
    console.log(chalk.cyan('\n📦 AI Blog Style Skill - Install\n'));
    console.log(chalk.bold('Available platforms:'));
    for (const [key, value] of Object.entries(PLATFORMS)) {
      console.log(chalk.gray(`   ${key.padEnd(10)}`), chalk.white(value.name));
    }
    console.log();
    console.log(chalk.gray('Usage:'));
    console.log(chalk.gray('   blog-style install <platform>    Install for specific platform'));
    console.log(chalk.gray('   blog-style install --all         Install for all platforms'));
    console.log();
    return;
  }

  // Validate platform
  if (platform && !validPlatforms.includes(platform as Platform)) {
    console.log(chalk.red(`\n❌ Invalid platform: "${platform}"`));
    console.log(chalk.gray(`   Valid platforms: ${validPlatforms.join(', ')}\n`));
    return;
  }

  const platformsToInstall = options.all ? validPlatforms : [platform as Platform];
  const packageRoot = findPackageRoot();

  console.log(chalk.cyan('\n📦 Installing AI Blog Style Skill\n'));
  console.log(chalk.gray(`   Destination: ${destDir}\n`));

  // Install shared files first
  console.log(chalk.bold('📁 Installing shared data files...'));
  for (const file of SHARED_FILES) {
    const srcPath = path.join(packageRoot, file);
    const destPath = path.join(destDir, file);
    
    if (fs.existsSync(srcPath)) {
      ensureDir(path.dirname(destPath));
      fs.copyFileSync(srcPath, destPath);
      console.log(chalk.green(`   ✓ ${file}`));
    } else {
      console.log(chalk.yellow(`   ⚠ ${file} (not found)`));
    }
  }
  console.log();

  // Install platform-specific files
  for (const p of platformsToInstall) {
    const platformConfig = PLATFORMS[p];
    console.log(chalk.bold(`📦 Installing for ${platformConfig.name}...`));
    
    for (const file of platformConfig.files) {
      const srcPath = path.join(packageRoot, file.src);
      const destPath = path.join(destDir, file.dest);
      
      if (fs.existsSync(srcPath)) {
        ensureDir(path.dirname(destPath));
        fs.copyFileSync(srcPath, destPath);
        console.log(chalk.green(`   ✓ ${file.dest}`));
      } else {
        console.log(chalk.yellow(`   ⚠ ${file.src} (not found)`));
      }
    }
    console.log();
  }

  console.log(chalk.green.bold('✅ Installation complete!\n'));
  console.log(chalk.gray('Next steps:'));
  console.log(chalk.gray('   1. Open your AI assistant'));
  console.log(chalk.gray('   2. Request to write a blog'));
  console.log(chalk.gray('   3. The skill will activate automatically\n'));
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
