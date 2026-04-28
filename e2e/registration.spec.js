const { test, expect } = require('@playwright/test');

test('successful registration via UI', async ({ page }) => {
  await page.goto('/');
  await page.locator('.block-login').fill('alex_2026');
  await page.locator('.block-password').fill('Strong123');
  await page.locator('.block-confirm-password').fill('Strong123');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.locator('.success')).toContainText('Регистрация прошла успешно');
});

test('registration with invalid password shows error', async ({ page }) => {
  await page.goto('/');
  await page.locator('.block-login').fill('alex_2026');
  await page.locator('.block-password').fill('weak');
  await page.locator('.block-confirm-password').fill('weak');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.locator('.error')).toContainText('Пароль');
});
