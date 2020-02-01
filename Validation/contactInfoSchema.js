const joi = require('joi');

const schema = {
    contactInfo: {
        name: joi.string().max(20).required(),
        phone: joi.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{10})$/).required()
    },
    contactInfo2: {
        name: joi.string().max(20).required(),
        phone: joi.string().regex(/^\(?([0-9]{3})\)?[-]?([0-9]{10})$/).required(),
        id: joi.string().required()
    },
    contactInfo3: {
        phone: joi.string().regex(/^\(?([0-9]{3})\)?[-]?([0-9]{10})$/).required()
    }
}

module.exports = schema;