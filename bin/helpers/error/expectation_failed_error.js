
const CommonError = require('./common_error');

class ExpectationFailedError extends CommonError {
  constructor(message) {
    super(message || 'Expectation Failed');
  }
}

module.exports = ExpectationFailedError;
