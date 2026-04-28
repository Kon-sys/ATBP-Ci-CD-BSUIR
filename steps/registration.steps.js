const { When, Then, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const assert = require('assert');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

let server;
let response;
let results = [];

BeforeAll(() => {
  server = app.listen(3001);
});

AfterAll(() => {
  if (server) server.close();
  const dir = path.join(process.cwd(), 'cucumber-report');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const rows = results.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.scenario}</td>
      <td>${item.status}</td>
      <td><pre>${JSON.stringify(item.body, null, 2)}</pre></td>
    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Cucumber API Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; background: #f8fafc; }
    h1 { color: #0f172a; }
    table { border-collapse: collapse; width: 100%; background: #fff; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #e2e8f0; }
    pre { margin: 0; white-space: pre-wrap; }
    .ok { color: #15803d; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Cucumber API Test Report</h1>
  <p class="ok">Scenarios executed: ${results.length}</p>
  <table>
    <thead>
      <tr><th>#</th><th>Scenario</th><th>Status</th><th>Response</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(dir, 'results.json'), JSON.stringify(results, null, 2), 'utf8');
});

When('I send valid registration data', async () => {
  response = await request(server)
    .post('/api/register')
    .send({ login: 'alex_2026', password: 'Strong123', confirmPassword: 'Strong123' });
  results.push({ scenario: 'Successful registration', status: response.status, body: response.body });
});

Then('the API response status should be {int}', function (status) {
  assert.strictEqual(response.status, status);
});

Then('the API response should contain success message', function () {
  assert.match(response.body.message, /успешно/i);
});

When('I send registration data with weak password', async () => {
  response = await request(server)
    .post('/api/register')
    .send({ login: 'alex_2026', password: 'weak', confirmPassword: 'weak' });
  results.push({ scenario: 'Registration with weak password', status: response.status, body: response.body });
});

Then('the API response should contain password validation error', function () {
  assert.match(response.body.errors.join(' '), /пароль/i);
});
