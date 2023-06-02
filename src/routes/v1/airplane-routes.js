const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const airplaneController = new AirplaneController();
const airplaneMiddleware = new AirplaneMiddlewares();

const router = express.Router();

router.post(
  '/',
  airplaneMiddleware.validateCreateRequest.bind(airplaneMiddleware),
  airplaneController.createAirplane.bind(airplaneController)
);

router.get('/', airplaneController.getAirplanes.bind(airplaneController));

module.exports = router;
