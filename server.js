const express = require('express');
const path = require('path');
const { validateRegistration } = require('./src/validator');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/register', (req, res) => {
  const result = validateRegistration(req.body || {});
  if (!result.valid) {
    return res.status(400).json({ success: false, errors: result.errors });
  }
  return res.json({ success: true, message: 'Регистрация прошла успешно' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
