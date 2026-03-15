#!/usr/bin/env node

/**
 * Simple test runner for development
 * Usage: node tests/run.js [test-pattern]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const pattern = args[0] || '';

console.log('🧪 Running Accès Badminton Website Tests\n');

try {
  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // Run tests with optional pattern
  const testCommand = pattern 
    ? `npm test -- --testNamePattern="${pattern}"`
    : 'npm test';

  console.log(`🚀 Running: ${testCommand}\n`);
  execSync(testCommand, { stdio: 'inherit' });

} catch (error) {
  console.error('\n❌ Tests failed');
  process.exit(1);
}
