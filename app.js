const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/write-review', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});
app.get('/reviews', catchAsync(async (req, res) => {
    const reviews = await Review.find({});
    res.render('reviews/index', { reviews })
}));

app.get('/reviews/new', (req, res) => {
    res.render('reviews/new');
});

app.post('/reviews', catchAsync(async (req, res) => {
    if(!req.body.review) throw new ExpressError('Invalid Review Data', 400);
    const review = new Review(req.body.review);
    await review.save();
    res.redirect(`/reviews/${review._id}`)
}));

app.get('/reviews/:id', catchAsync(async (req, res) => {
    const review = await Review.findById(req.params.id)
    res.render('reviews/show', { review });
}));

app.get('/reviews/:id/edit', catchAsync(async (req, res) => {
    const review = await Review.findById(req.params.id)
    res.render('reviews/edit', { review });
}));

app.put('/reviews/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, {...req.body.review})
    res.redirect(`/reviews/${review._id}`)
}));

app.delete('/reviews/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.redirect('/reviews');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found!', 404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
});