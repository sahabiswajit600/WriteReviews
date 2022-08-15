const Review = require('../models/review');

module.exports.index = async (req, res) => {
    const reviews = await Review.find({});
    res.render('reviews/index', { reviews })
};

module.exports.renderNewForm = (req, res) => {
    res.render('reviews/new');
};

module.exports.createReview = async (req, res) => {
    const review = new Review(req.body.review);
    review.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    review.author = req.user._id;
    await review.save();
    console.log(review);
    req.flash('success', 'Successfully made a new review!');
    res.redirect(`/reviews/${review._id}`);
};

module.exports.showReview = async (req, res) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!review) {
        req.flash('error', 'Cannot find that review!');
        return res.redirect('/reviews');
    }
    res.render('reviews/show', { review });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    if(!review) {
        req.flash('error', 'Cannot find that review!');
        return res.redirect('/reviews');
    }
    res.render('reviews/edit', { review });
};

module.exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, {...req.body.review})
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    review.images.push(...imgs);
    await review.save();
    req.flash('success', 'Successfully updated review!');
    res.redirect(`/reviews/${review._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted review!');
    res.redirect('/reviews');
};