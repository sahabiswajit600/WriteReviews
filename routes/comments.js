const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');
const Comment = require('../models/comment');

const { commentSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.post('/', validateComment, catchAsync(async(req, res) => {
    const review = await Review.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    review.comments.push(comment);
    await comment.save();
    await review.save();
    res.redirect(`/reviews/${review._id}`);
}));

router.delete('/:commentId', catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Review.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/reviews/${id}`);
}));

module.exports = router;