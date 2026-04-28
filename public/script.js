async function submitRegistration() {
  const login = document.querySelector('.block-login').value;
  const password = document.querySelector('.block-password').value;
  const confirmPassword = document.querySelector('.block-confirm-password').value;
  const successBox = document.querySelector('.success');
  const errorBox = document.querySelector('.error');

  successBox.textContent = '';
  errorBox.textContent = '';

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password, confirmPassword })
  });

  const data = await response.json();
  if (response.ok) {
    successBox.textContent = data.message;
  } else {
    errorBox.textContent = data.errors.join('; ');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerBtn').addEventListener('click', submitRegistration);
});
