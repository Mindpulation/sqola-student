
const CommonError = require('./common_error');

class GatewayTimeoutError extends CommonError {
  constructor(message) {
    super(message || 'Gateway Timeout');
  }
}

module.exports = GatewayTimeoutError;
