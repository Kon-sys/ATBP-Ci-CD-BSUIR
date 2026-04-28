const { validateLogin, validatePassword, validateRegistration } = require('../src/validator');

describe('Credential validator unit tests', () => {
  test('valid login passes', () => {
    expect(validateLogin('alex_2026')).toBeNull();
  });

  test('short login fails', () => {
    expect(validateLogin('ab')).toMatch(/минимум 4/);
  });

  test('strong password passes', () => {
    expect(validatePassword('Strong123')).toBeNull();
  });

  test('password without uppercase fails', () => {
    expect(validatePassword('strong123')).toMatch(/заглавную/);
  });

  test('full registration validation returns success', () => {
    const result = validateRegistration({
      login: 'alex_2026',
      password: 'Strong123',
      confirmPassword: 'Strong123'
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('password mismatch fails', () => {
    const result = validateRegistration({
      login: 'alex_2026',
      password: 'Strong123',
      confirmPassword: 'Strong124'
    });
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/не совпадают/);
  });
});
