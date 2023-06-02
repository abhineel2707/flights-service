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

  /**
   * Handles the request to get all airplanes.
   * Fetches all airplanes from the airplane service.
   * If successful, return a successful response with an array of airplanes.
   * If there's an error, returns error response with error details.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} - The response object.
   */
  async getAirplanes(req, res) {
    try {
      const airplanes = await this.airplaneService.getAirplanes();
      SuccessResponse.data = airplanes;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }
}

module.exports = AirplaneController;
