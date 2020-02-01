const joi = require('joi');

const contactSchema = joi.object().keys({
    name: joi.string().max(20).required(),
    phone: joi.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{10})$/).required()
});

const contactInfoValidation = () => {

    return (req, res, next) => {
        const result = joi.validate(req.body, contactSchema);

        const { value, error } = result;
        const valid = error == null;

        if (!valid) {
            res.status(422).json({
                message: 'Invalid request',
                data: body
            })
        }
        else {
            next();
        }
    }
}

module.exports = contactInfoValidation;