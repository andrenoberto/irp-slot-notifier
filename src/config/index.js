require('dotenv').config();
const getEnv = require('getenv');

const registrationOffice = {
  action: getEnv.string('REGISTRATION_OFFICE_API_ACTION'),
  address: getEnv.string('REGISTRATION_OFFICE_ADDRESS'),
  category: getEnv.string('REGISTRATION_OFFICE_CATEGORY'),
  endpoint: getEnv.string('REGISTRATION_OFFICE_API_ENDPOINT'),
  subCategory: getEnv.string('REGISTRATION_OFFICE_SUB_CATEGORY'),
  type: getEnv.string('REGISTRATION_OFFICE_TYPE'),
};

const twilio = {
  accountSid: getEnv.string('TWILIO_ACCOUNT_SID'),
  authToken: getEnv.string('TWILIO_AUTH_TOKEN'),
  messagingServiceSid: getEnv.string('TWILIO_MESSAGING_SERVICE_SID'),
  receiverNumber: getEnv.string('TWILIO_RECEIVER_NUMBER'),
};

module.exports = {
  registrationOffice,
  twilio,
};
