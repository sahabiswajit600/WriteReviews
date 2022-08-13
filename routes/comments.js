const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateComment, isLoggedIn } = require('../middleware');
const Review = require('../models/review');
const Comment = require('../models/comment');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateComment, catchAsync(async(req, res) => {
    const review = await Review.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    review.comments.push(comment);
    await comment.save();
    await review.save();
    req.flash('success', 'Created new comment!');
    res.redirect(`/reviews/${review._id}`);
}));

router.delete('/:commentId', catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Review.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Successfully deleted comment!');
    res.redirect(`/reviews/${id}`);
}));

module.exports = router;