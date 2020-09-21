
const CommonError = require('./common_error');

class InternalServerError extends CommonError {
  constructor(message) {
    super(message || 'Internal Server Error');
  }
}

module.exports = InternalServerError;
