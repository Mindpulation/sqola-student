
const CommonError = require('./common_error');

class NotFoundError extends CommonError {
  constructor(message) {
    super(message || 'Not Found');
  }
}

module.exports = NotFoundError;
