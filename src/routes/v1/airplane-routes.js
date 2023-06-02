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

router.get('/:id', airplaneController.getAirplane.bind(airplaneController));

router.patch(
  '/:id',
  airplaneController.updateAirplane.bind(airplaneController)
);

router.delete(
  '/:id',
  airplaneController.destroyAirplane.bind(airplaneController)
);

module.exports = router;
