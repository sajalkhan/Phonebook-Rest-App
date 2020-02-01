const joi = require('joi');
const contactSchema = require('./contactInfoSchema');

const contactInfoValidation = (req, res, next) => {

    const result = joi.validate(req, contactSchema);

    const { body } = req;
    const { value, error } = result;
    const valid = error == null;

    if (!valid) {
        res.status(422).json({
            message: 'please Enter a valid BD phone number',
            data: body
        })
    }
    else {
        next();
    }
}

module.exports = contactInfoValidation;