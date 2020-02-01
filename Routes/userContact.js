var express = require('express');
var router = express.Router();
var contact_model = require('../Models/Contact');
const contactSchema = require('../Validation/contactInfoSchema');
const contactInfoValidation = require('../Validation/ContactValidation');

/**
 * Get all Contact
 */
router.get('/', async (req, res) => {

    try {
        const getData = await contact_model.find((err, data) => {

            if (err) return console.log(err);

            res.render('contactPage', {
                info: data,
                name: data.name,
                phone: data.phone,
                id: data._id
            });
        });
    } catch (err) {

    }

});

/**
 * add new Contact
 */
router.post('/addnewContact', contactInfoValidation(contactSchema.contactInfo,'body'), async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;

    contact_model.findOne({phone: phone} , (err, data)=>{
        if(data)
        {
            req.flash('danger',`${phone} number exists, choose another number`);
            res.redirect('/');
        }
        else
        {
            var contat = new contact_model({
                name: name,
                phone: phone
            });
        
            contat.save((err) => {
                req.flash('success','Contact Added Successfully!');
                res.redirect('/');
            })
        }
    })

});

/**
 * Post edit contact 
 */
router.post('/editContact', contactInfoValidation(contactSchema.contactInfo2, 'body'), async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;
    var id = req.body.id;

    contact_model.findOne({phone: phone} , (err, data)=>{
        if(data)
        {
            req.flash('danger',`${phone} number exists, choose another number`);
            res.redirect('/');
        }
        else
        {
            try {
                contact_model.findById(id, (err, data) => {
        
                    if (err) return console.log('edit contact error ' + err);
        
                    // just assign value so it will update
                    data.name = name;
                    data.phone = phone;
        
                    data.save((err) => {
                        if (err) return console.log(err);
                        req.flash('success','Contact Edited Successfully!');
                        res.redirect('/');
                    });
        
                });
            } catch (err) {
        
            }
        }
    })
});

/**
 * post Delete contact 
 */
router.post('/DeleteContact', async (req, res) => {

    try {
        await contact_model.findByIdAndDelete(req.body.id, (err) => {
            if (err) return console.log(err);
            req.flash('success','Contact Deleted Successfully!');
            res.redirect('/');
        });
    } catch (err) {
        console.log('error on delete function ' + err);
    }
});

router.post('/searchContact', contactInfoValidation(contactSchema.contactInfo3, 'body'), async (req, res) => {

    var phone = req.body.phone;
    if (!phone) {
        res.redirect('/');
    }
    else
    {
        try {
            await contact_model.findOne({ phone: phone }, (err, data) => {
                if (err) return console.log('search '+err);
    
                if(data)
                {
                    res.render('contactPage', {
                        info: data,
                        name: data.name,
                        phone: data.phone,
                        id: data._id
                    });
                }
                else {
                    req.flash('warning',`${phone} number not found!`);
                    res.redirect('/');
                }
            });
        }
        catch (err) {
    
        }
    }
});

module.exports = router;