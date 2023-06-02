const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const { AppError } = require('../utils');

class AirplaneService {
  constructor() {
    this.airplaneRepository = new AirplaneRepository();
  }

  /**
   * Creates a new airplane with provided data.
   * If there are any validation errors, a list of them is returned.
   * If there are any other errors, a generic error message is returned.
   *
   * @param {Object} data - The data to create airplane with.
   * @returns {Promise<Object>} - The created airplane.
   * @throws {AppError} - If there are validation errors, or if there is another error.
   */
  async createAirplane(data) {
    try {
      const airplane = await this.airplaneRepository.create(data);
      return airplane;
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        let explanations = [];
        error.errors.forEach((error) => {
          explanations.push(error.message);
        });
        throw new AppError(explanations, StatusCodes.BAD_REQUEST);
      }

      throw new AppError(
        ['Cannot create a new Airplane object'],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = AirplaneService;
