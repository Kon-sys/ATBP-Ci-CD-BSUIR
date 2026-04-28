# ЛР6, вариант 9 — CI/CD для комплексных автоматизированных тестов

## Запуск проекта локально

```bash
npm install
npx playwright install chromium
npm start
```

Открыть приложение: http://127.0.0.1:3000

## Запуск тестов и отчётов

```bash
npm run test:unit
npm run test:api
npm run test:ui:chromium
npm run test:all
npm run allure:generate
```

## Где смотреть отчёты

- Jest: `reports/jest/jest-report.html`
- Cucumber: `cucumber-report/index.html`
- Playwright: `playwright-report/index.html`
- Allure: `allure-report/index.html`

## GitHub Actions

Файл пайплайна находится здесь:

`.github/workflows/ci.yml`

Перед запуском в GitHub нужно включить GitHub Pages:

`Settings → Pages → Source → GitHub Actions`

Для Telegram-уведомлений добавить secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
