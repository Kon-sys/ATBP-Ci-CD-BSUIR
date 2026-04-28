module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports/jest',
      filename: 'jest-report.html',
      expand: true
    }],
    ['allure-jest', {
      resultsDir: './allure-results'
    }]
  ]
};
