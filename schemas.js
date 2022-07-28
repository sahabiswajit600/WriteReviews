const Joi = require('joi');

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});