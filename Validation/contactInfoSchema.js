const joi = require('joi');

const schema = {
    contactInfo: {
        name: joi.string().max(20).required(),
        phone: joi.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{10})$/).required()
    }
}

module.exports = schema;