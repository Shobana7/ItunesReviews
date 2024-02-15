const express = require('express');
const reviewRoute = express.Router();

const reviewController = require('../controller/reviewController.js');

reviewRoute.get('/', reviewController.fetchReviews);

module.exports = reviewRoute;