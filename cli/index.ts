#!/usr/bin/env node
/**
 * AI Blog Style Skill CLI
 * Command-line interface for managing blog style skill
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { search, list, validate, install, init } from './commands';

const program = new Command();

program
  .name('blog-style')
  .description('AI Blog Style Skill - CLI for managing blog writing styles')
  .version('2.0.0');

// Search command
program
  .command('search <query>')
  .description('Search writing styles, tones, structures, and templates')
  .option('-t, --type <type>', 'Filter by type: style, tone, structure, industry, blacklist')
  .option('-j, --json', 'Output as JSON')
  .action(search);

// List command
program
  .command('list [type]')
  .description('List all available data (styles, tones, structures, industries)')
  .option('-j, --json', 'Output as JSON')
  .action(list);

// Validate command
program
  .command('validate <file>')
  .description('Validate a blog post against style rules')
  .option('-s, --strict', 'Enable strict validation')
  .option('-j, --json', 'Output as JSON')
  .action(validate);

// Install command
program
  .command('install [platform]')
  .description('Install skill files for a specific AI platform')
  .option('-a, --all', 'Install for all platforms')
  .option('-d, --dest <path>', 'Destination directory', '.')
  .action(install);

// Init command
program
  .command('init')
  .description('Initialize blog-style skill in current project')
  .option('-f, --force', 'Overwrite existing files')
  .action(init);

program.parse();
