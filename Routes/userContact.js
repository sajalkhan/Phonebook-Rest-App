var joi = require('joi');
var express = require('express');
var router = express.Router();
var contact_model = require('../Models/Contact');
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
router.post('/addnewContact', contactInfoValidation, async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;

    var contat = new contact_model({
        name: name,
        phone: phone
    });

    contat.save((err) => {
        if (err) return console.log(err);
        res.redirect('/');
    })

});

/**
 * Post edit contact 
 */
router.post('/editContact', contactInfoValidation, async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;
    var id = req.body.id;

    try {
        contact_model.findById(id, (err, data) => {

            if (err) return console.log('edit contact error ' + err);

            // just assign value so it will update
            data.name = name;
            data.phone = phone;

            data.save((err) => {
                if (err) return console.log(err);
                res.redirect('/');
            });

        });
    } catch (err) {

    }
});

/**
 * post Delete contact 
 */
router.post('/DeleteContact', async (req, res) => {

    try {
        await contact_model.findByIdAndDelete(req.body.id, (err) => {
            if (err) return console.log(err);
            res.redirect('/');
        });
    } catch (err) {
        console.log('error on delete function ' + err);
    }
});

router.post('/searchContact', async (req, res) => {

    var phone = req.body.phone;
    if (!phone) {
        res.redirect('/');
    }

    try {
        await contact_model.find({ phone: req.body.phone }, (err, data) => {
            if (err) return console.log(err);

            res.render('contactPage', {
                info: data,
                name: data.name,
                phone: data.phone,
                id: data._id
            });
        });
    }
    catch (err) {

    }
});

module.exports = router;