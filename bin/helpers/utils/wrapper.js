
const { NotFoundError, InternalServerError, BadRequestError, ConflictError, ExpectationFailedError,
  ForbiddenError, GatewayTimeoutError, ServiceUnavailableError, UnauthorizedError } = require('../error');
const { ERROR:httpError } = require('../http-status/status_code');

const data = (data) => ({ err: null, data});

const paginationData = (data, meta) => ({ err: null, data, meta});

const error = (err) => ({ err, data: null });

const response = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if(type === 'fail'){
    status = false;
    data = '';
    message = result.err.message || message;
    code = checkErrorCode(result.err);
  }
  res.send(code,
    {
      success: status,
      data,
      message,
      code
    });
};

const paginationResponse = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if(type === 'fail'){
    status = false;
    data = '';
    message = result.err;
  }
  res.send(code,
    {
      success: status,
      data,
      meta: result.meta,
      code,
      message
    }
  );
};

const checkErrorCode = (error) => {

  switch (error.constructor) {
  case BadRequestError:
    return httpError.BAD_REQUEST;
  case ConflictError:
    return httpError.CONFLICT;
  case ExpectationFailedError:
    return httpError.EXPECTATION_FAILED;
  case ForbiddenError:
    return httpError.FORBIDDEN;
  case GatewayTimeoutError:
    return httpError.GATEWAY_TIMEOUT;
  case InternalServerError:
    return httpError.INTERNAL_ERROR;
  case NotFoundError:
    return httpError.NOT_FOUND;
  case ServiceUnavailableError:
    return httpError.SERVICE_UNAVAILABLE;
  case UnauthorizedError:
    return httpError.UNAUTHORIZED;
  default:
    return httpError.CONFLICT;
  }

};

module.exports = {
  data,
  paginationData,
  error,
  response,
  paginationResponse
};
