const twilio = require('twilio');

const config = require('@config');

const _client = twilio(config.twilio.accountSid, config.twilio.authToken);

const sendMessage = async (to, message) => {
  try {
    await _client.messages.create({
      body: message,
      messagingServiceSid: config.twilio.messagingServiceSid,
      to,
    });
  } catch (err) {
    console.error(`Error trying to send message: ${err}`);
  }
};

module.exports = {
  sendMessage,
};
