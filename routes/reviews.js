const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.get('/', catchAsync(async (req, res) => {
    const reviews = await Review.find({});
    res.render('reviews/index', { reviews })
}));

router.get('/new', (req, res) => {
    res.render('reviews/new');
});

router.post('/', validateReview, catchAsync(async (req, res) => {
    const review = new Review(req.body.review);
    await review.save();
    req.flash('success', 'Successfully made a new review!');
    res.redirect(`/reviews/${review._id}`)
}));

router.get('/:id', catchAsync(async (req, res) => {
    const review = await Review.findById(req.params.id).populate('comments');
    res.render('reviews/show', { review });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const review = await Review.findById(req.params.id)
    res.render('reviews/edit', { review });
}));

router.put('/:id', validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, {...req.body.review})
    res.redirect(`/reviews/${review._id}`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.redirect('/reviews');
}));

module.exports = router;