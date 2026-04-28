module.exports = {
  default: {
    require: ['steps/**/*.js'],
    paths: ['features/**/*.feature'],
    format: [
      'progress',
      'html:cucumber-report/index.html',
      'json:cucumber-report/results.json'
    ]
  }
};
