const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports.createComment = async(req, res) => {
    const review = await Review.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    review.comments.push(comment);
    await comment.save();
    await review.save();
    req.flash('success', 'Created new comment!');
    res.redirect(`/reviews/${review._id}`);
};

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Review.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Successfully deleted comment!');
    res.redirect(`/reviews/${id}`);
};