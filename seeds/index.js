const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/write-review', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Review.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const review = new Review({
            author: '62f5c49033c4dabb1b70b5aa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: "Point",
                coordinates: [-113.133115, 47.020078] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/sahabiswajit600/image/upload/v1660535215/WriteReviews/wxpzhgibovjb47d5socx.jpg',
                    filename: 'WriteReviews/wxpzhgibovjb47d5socx'
                },
                {
                    url: 'https://res.cloudinary.com/sahabiswajit600/image/upload/v1660540550/WriteReviews/hdqead9zru10cs5jnj8l.jpg',
                    filename: 'WriteReviews/hdqead9zru10cs5jnj8l'
                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem cumque odit reiciendis quo fuga quis architecto modi temporibus accusamus. Neque quaerat dignissimos perspiciatis. Unde est dignissimos esse autem maxime sed.'
        })
        await review.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})