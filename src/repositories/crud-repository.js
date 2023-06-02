const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // C of CRUD
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  // D of CRUD
  async destroy(id) {
    const response = await this.model.destroy({
      where: {
        id: id
      }
    });

    if (!response) {
      throw new AppError(['Cannot find resource'], StatusCodes.NOT_FOUND);
    }

    return response;
  }

  // R of CRUD
  async get(id) {
    const response = await this.model.findByPk(id);
    if (!response) {
      throw new AppError(['Cannot find resource'], StatusCodes.NOT_FOUND);
    }

    return response;
  }

  // R of CRUD
  async getAll() {
    const response = await this.model.findAll();

    return response;
  }

  // U of CRUD
  async update(data, id) {
    const response = await this.model.update(data, {
      where: {
        id: id
      }
    });

    if (!response.at(0)) {
      throw new AppError(['Cannot find resource'], StatusCodes.NOT_FOUND);
    }

    return response;
  }
}

module.exports = CrudRepository;
