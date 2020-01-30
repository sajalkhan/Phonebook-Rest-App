var express = require('express');
var router = express.Router();
var contact_model = require('../Models/Contact');

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
 * Get Edit pages 
 */
router.get('/editContact/:id', async (req,res)=>{
    try{
        await contact_model.findById(req.params.id,(err,data)=>{
            if(err)return console.log(err);
            
            res.render('contactPage',{
                name: data.name,
                phone: data.phone,
                id:data._id
            });
        });
    }catch(err){

    }
});

/**
 * add new Contact
 */
router.post('/addnewContact', async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;

    var contat = new contact_model({
        name: name,
        phone: phone
    });

    contat.save((err) => {
        if (err) return console.log(err);
        // req.flash('success', 'Page Added');
        res.redirect('/');
    });

});

module.exports = router;