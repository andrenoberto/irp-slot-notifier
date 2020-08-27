const { general: { timezone } } = require('@config');

const getLocalDate = () => new Date(getLocalDateString());

const getLocalDateString = () => new Date().toLocaleString('en', { timezone });

module.exports = {
  getLocalDate,
  getLocalDateString,
};
