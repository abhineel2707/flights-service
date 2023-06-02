const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils');

class AirplaneController {
  constructor() {
    this.airplaneService = new AirplaneService();
  }

  /**
   * Handles the creation of airplane.
   * Parses the request body to get the airplane's model number and capacity.
   * Then, creates the airplane using the airplane service.
   * If successful, returns a successful response with created airplane.
   * If there's an error, returns an error response with error details.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} - The response object.
   */
  async createAirplane(req, res) {
    try {
      const { modelNumber, capacity } = req.body;
      const airplane = await this.airplaneService.createAirplane({
        modelNumber,
        capacity
      });
      SuccessResponse.data = airplane;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }
}

module.exports = AirplaneController;
