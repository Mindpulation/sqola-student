const config = require('config')
const raven = require('raven');

const sendError = async (errorMessage) => {
  raven.config(config.get('dnsSentryUrl')).install();
  raven.captureMessage(errorMessage);
};

module.exports = {
  sendError
};
