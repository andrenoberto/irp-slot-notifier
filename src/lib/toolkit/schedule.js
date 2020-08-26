const cron = require('node-cron');

const schedule = (expression, callback) => cron.schedule(expression, callback);

module.exports = schedule;
