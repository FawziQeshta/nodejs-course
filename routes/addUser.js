const express = require('express');
const router = express.Router();
const Customer = require('../models/customerSchema'); // Import the LoginModel from the loginSchema.js file
var moment = require('moment'); // Import the moment library
moment().format(); // Use moment to format the current date and time


router.get('/user/add.html', (req, res) => {
    res.render('user/add.ejs', { title: 'Add User Page' })
})

router.post('/add-customer', (req, res) => {
    const customer = new Customer(req.body);

    customer.save().then(() => {
        console.log('Customer added successfully!');
        res.redirect('/');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error saving customer to database');
    });

})

module.exports = router;
