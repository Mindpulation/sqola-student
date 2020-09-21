
const CommonError = require('./common_error');

class ConflictError extends CommonError {
  constructor(message) {
    super(message || 'Conflict');
  }
}

module.exports = ConflictError;
