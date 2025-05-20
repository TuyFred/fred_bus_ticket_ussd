const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'rw'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  objectNotation: true
});

module.exports = i18n;
