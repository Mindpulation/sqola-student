
const CommonError = require('./common_error');

class Unauthorized extends CommonError {
  constructor(message) {
    super(message || 'Unauthorized');
  }
}

module.exports = Unauthorized;
