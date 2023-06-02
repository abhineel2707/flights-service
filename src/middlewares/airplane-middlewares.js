const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, AppError } = require('../utils');

class AirplaneMiddlewares {
  validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
      ErrorResponse.message = 'Something went wrong while creating airplane';
      ErrorResponse.error = new AppError(
        ['Airplane modelNumber is not found in incoming request'],
        StatusCodes.BAD_REQUEST
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
  }
}

module.exports = AirplaneMiddlewares;
