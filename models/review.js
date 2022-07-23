const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Review', ReviewSchema);
