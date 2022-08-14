const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateReview } = require('../middleware');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const Review = require('../models/review');

router.route('/')
    .get(catchAsync(reviews.index))
    //.post(isLoggedIn, validateReview, catchAsync(reviews.createReview));
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files)
        res.send('it worked')
    })

router.get('/new', isLoggedIn, reviews.renderNewForm);

router.route('/:id')
    .get(catchAsync(reviews.showReview))
    .put(isLoggedIn, isAuthor, validateReview, catchAsync(reviews.updateReview))
    .delete(isLoggedIn, isAuthor, catchAsync(reviews.deleteReview));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(reviews.renderEditForm));

module.exports = router;