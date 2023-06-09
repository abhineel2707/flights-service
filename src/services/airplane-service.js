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

  /**
   * Fetches all the airplanes from the repository.
   * If successful, returns an array of airplane objects.
   * If there's an error, throws an AppError with a generic error message.
   *
   * @returns {Promise<Array<Object>>} - An array of airplane objects.
   * @throws {AppError} - If there is an error fetching the airplanes.
   */
  async getAirplanes() {
    try {
      const airplanes = await this.airplaneRepository.getAll();
      return airplanes;
    } catch (error) {
      throw new AppError(
        ['Cannot fetch data of all the airplanes'],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Fetches an airplane with provided ID from the repository.
   * If successful, returns the airplane object.
   * If the airplane with given ID is not found, throws AppError with a specific message and status code.
   * If there's another error, throws AppError with generic error message.
   *
   * @param {string|number} id - The ID of the airplane to fetch
   * @returns {Promise<Object>} The airplane object
   * @throws {AppError} If the airplane is not found, or if there's another error in fetching the airplane
   */
  async getAirplane(id) {
    try {
      const airplane = await this.airplaneRepository.get(id);
      return airplane;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          ['The airplane you requested is not found'],
          error.statusCode
        );
      }

      throw new AppError(
        ['Cannot fetch data for the airplane'],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Updates an airplane with the provided ID using the provided data.
   * If successful, returns the updated airplane object.
   * If the airplane with the given ID is not found, throws an AppError with a specific message and status code.
   * If there's another error, throws an AppError with a generic error message.
   *
   * @param {Object} data - The data to update the airplane with
   * @param {string|number} id - The ID of the airplane to update
   * @returns {Promise<Object>} The updated airplane object
   * @throws {AppError} If the airplane is not found, or if there's another error updating the airplane
   */
  async updateAirplane(data, id) {
    try {
      const updatedAirplane = await this.airplaneRepository.update(data, id);
      return updatedAirplane;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          ['The airplane you requested to update is not found'],
          error.statusCode
        );
      }
      throw new AppError(
        ['Cannot update the airplane'],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Deletes an airplane with the provided ID.
   * If successful, returns the response from the repository's destroy method.
   * If the airplane with the given ID is not found, throws an AppError with a specific message and status code.
   * If there's another error, throws an AppError with a generic error message.
   *
   * @param {string|number} id - The ID of the airplane to delete
   * @returns {Promise<Object>} The response from the repository's destroy method
   * @throws {AppError} If the airplane is not found, or if there's another error deleting the airplane
   */
  async destroyAirplane(id) {
    try {
      const response = await this.airplaneRepository.destroy(id);
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          ['The airplane you requested to delete is not found'],
          error.statusCode
        );
      }
      throw new AppError(
        ['Cannot delete the airplane'],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = AirplaneService;
