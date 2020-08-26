const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@clients': `${__dirname}/clients`,
  '@config': `${__dirname}/config`,
  '@lib': `${__dirname}/lib`,
  '@src': __dirname,
});

const { findAppointmentsAndNotify  } = require('@lib/registration-office');
const schedule = require('@lib/toolkit/schedule');

const cronExpression = '* * * * *';
schedule(cronExpression, findAppointmentsAndNotify);
