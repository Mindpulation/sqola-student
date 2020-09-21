
const CommonError = require('./common_error');

class ServiceUnavailableError extends CommonError {
  constructor(message) {
    super(message || 'Service Unavailable');
  }
}

module.exports = ServiceUnavailableError;
