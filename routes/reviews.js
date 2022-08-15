const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateReview } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Review = require('../models/review');

router.route('/')
    .get(catchAsync(reviews.index))
    .post(isLoggedIn, upload.array('image'), validateReview, catchAsync(reviews.createReview));

router.get('/new', isLoggedIn, reviews.renderNewForm);

router.route('/:id')
    .get(catchAsync(reviews.showReview))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateReview, catchAsync(reviews.updateReview))
    .delete(isLoggedIn, isAuthor, catchAsync(reviews.deleteReview));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(reviews.renderEditForm));

module.exports = router;