const Customer = require('../models/customerSchema'); // Import the LoginModel from the loginSchema.js file

const getCustomerDataById = (req, res) => {
    Customer.findById(req.params.id).then(user => {
        res.render('user/edit.ejs', { title: 'Edit User Page', customer: user })
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
    });
}

const updateCustomerData = (req, res) => {
    /*Customer.findOneAndUpdate({_id: req.params.id}, req.body).then(user => {
        console.log('Customer updated successfully!');
        res.redirect('/');
      }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
      }
    );*/

    Customer.findByIdAndUpdate(req.params.id, req.body).then(user => {
        console.log('Customer updated successfully!');
        res.redirect('/');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
    });
}

module.exports = { getCustomerDataById, updateCustomerData };