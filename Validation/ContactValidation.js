const Joi = require('joi');

const contactInfoValidation = (schema, property) => {

    return (req, res, next)=> {

        const { error } = Joi.validate(req[property], schema);
        const valid = error == null;
        
        if (valid) 
        {
          next();
        }
        else 
        {
            // res.status(422).json({
            //     message: 'please Enter a valid BD phone number',
            //     data: req[property]
            // });
            req.flash('danger','please Enter a valid BD phone number!');
            res.redirect('/');
        }

    }
}

module.exports = contactInfoValidation;