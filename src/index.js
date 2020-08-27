const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@clients': `${__dirname}/clients`,
  '@config': `${__dirname}/config`,
  '@lib': `${__dirname}/lib`,
  '@src': __dirname,
});

const config = require('@config');
const { findAppointmentsAndNotify  } = require('@lib/registration-office');
const schedule = require('@lib/toolkit/schedule');

schedule(config.general.cronExpression, findAppointmentsAndNotify);
