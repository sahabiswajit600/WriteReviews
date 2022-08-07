const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

ReviewSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
