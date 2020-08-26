const twilio = require('twilio');

const config = require('@config');

const _client = twilio(config.twilio.accountSid, config.twilio.authToken);

const sendMessage = async (to, message) => {
  try {
    const result = await _client.messages.create({
      from: config.twilio.senderNumber,
      body: message,
      to,
    });
  } catch (err) {
    console.error(`Error trying to send message: ${err}`);
  }
};

module.exports = {
  sendMessage,
};
