const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/makereview', async (req, res) => {
    const review = new Review({title: 'My Backyard', description: 'cheap camping!'});
    await review.save();
    res.send(review);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})