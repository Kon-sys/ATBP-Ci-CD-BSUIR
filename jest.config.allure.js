module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/jest',
        filename: 'jest-report.html',
        openReport: false
      }
    ]
  ]
};