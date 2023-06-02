'use strict';

const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'Airbus-A340',
        capacity: 377,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Airbus-A350',
        capacity: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Airbus-A380',
        capacity: 555,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Boeing-737',
        capacity: 215,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'Boeing-777',
        capacity: 550,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airplanes', {
      [Op.or]: [
        { modelNumber: 'Boeing-777' },
        { modelNumber: 'Airbus-A380' },
        { modelNumber: 'Airbus-A350' }
      ]
    });
  }
};
