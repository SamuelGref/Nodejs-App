const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// router.param('id', tourController.chekID);
// router

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAlltours);

router
  .route('/')
  .get(tourController.getAlltours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
