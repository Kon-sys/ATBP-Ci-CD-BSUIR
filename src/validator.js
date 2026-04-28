function validateLogin(login = '') {
  if (!login || login.trim().length < 4) {
    return 'Логин должен содержать минимум 4 символа';
  }
  if (!/^[A-Za-z0-9_]+$/.test(login)) {
    return 'Логин может содержать только буквы, цифры и _';
  }
  return null;
}

function validatePassword(password = '') {
  if (!password || password.length < 8) {
    return 'Пароль должен содержать минимум 8 символов';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  if (!/[a-z]/.test(password)) {
    return 'Пароль должен содержать хотя бы одну строчную букву';
  }
  if (!/[0-9]/.test(password)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }
  return null;
}

function validateRegistration({ login = '', password = '', confirmPassword = '' } = {}) {
  const errors = [];
  const loginError = validateLogin(login);
  const passwordError = validatePassword(password);

  if (loginError) errors.push(loginError);
  if (passwordError) errors.push(passwordError);
  if (password !== confirmPassword) {
    errors.push('Пароль и подтверждение пароля не совпадают');
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateLogin, validatePassword, validateRegistration };
