const https = require('https')
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const { registrationOffice, twilio } = require('@config');
const twilioClient = require('@clients/twilio');

const MESSAGES = {
  empty: () => `There are no available slots at the Burgh Quay Registration Office at the moment. We'll keep you up to date as soon as we get an available slot!`,
  success: url => `There might an available slot at the Burgh Quay Registration Office. Check it out and make your appointment: ${url}`,
};

const findAppointmentsAndNotify = async () => {
  try {
    const isFeedbackTime = _isFeedbackTime();
    const hasAvailableSlot = await _hasAvailableSlot();
    const message = hasAvailableSlot
      ? MESSAGES.success(registrationOffice.address)
      : MESSAGES.empty();

    if (isFeedbackTime || hasAvailableSlot) {
      twilioClient.sendMessage(twilio.receiverNumber, message);
    }
  } catch (err) {
    console.error(`Error in appointment checking/notifying proccess: ${err}`);
  }
};

const _isFeedbackTime = () => {
  const now = new Date();
  const [hours, minutes] = [now.getHours(), now.getMinutes()];

  return hours === 18 && minutes === 00;
};

const _hasAvailableSlot = async () => {
  try {
    const url = _getAppointmentsURL();
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(url, { agent });
    const { empty } = await response.json();

    return !(new Boolean(empty));
  } catch (err) {
    console.error(`Error trying to fetch appointments: ${err}`);
  }
}

const _getAppointmentsURL = () => {
  const params = new URLSearchParams({
    cat: registrationOffice.category,
    sbcat: registrationOffice.subCategory,
    typ: registrationOffice.type,
  });

  return `${registrationOffice.address}/${registrationOffice.endpoint}/(${registrationOffice.action})?readform&${params.toString()}`;
};

module.exports = {
  findAppointmentsAndNotify,
};
