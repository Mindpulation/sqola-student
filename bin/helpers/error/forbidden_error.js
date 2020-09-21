
const CommonError = require('./common_error');

class ForbiddenError extends CommonError {
  constructor(message) {
    super(message || 'Forbidden');
  }
}

module.exports = ForbiddenError;
