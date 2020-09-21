
const CommonError = require('./common_error');

class BadRequestError extends CommonError {
  constructor(message) {
    super(message || 'Bad Request');
  }
}

module.exports = BadRequestError;
