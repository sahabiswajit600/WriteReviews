const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateReview } = require('../middleware');

const Review = require('../models/review');

router.get('/', catchAsync(reviews.index));

router.get('/new', isLoggedIn, reviews.renderNewForm);

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.get('/:id', catchAsync(reviews.showReview));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(reviews.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateReview, catchAsync(reviews.updateReview));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(reviews.deleteReview));

module.exports = router;