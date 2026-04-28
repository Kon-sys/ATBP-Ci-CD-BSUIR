const fs = require('fs');
const path = require('path');
const targets = ['allure-results', 'allure-report', 'playwright-report', 'reports', 'cucumber-report', 'test-results'];
for (const target of targets) {
  const full = path.join(process.cwd(), target);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
  }
}
console.log('Cleaned old reports');
