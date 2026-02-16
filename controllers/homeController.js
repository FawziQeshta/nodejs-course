const Customer = require('../models/customerSchema'); // Import the LoginModel from the loginSchema.js file
var moment = require('moment'); // Import the moment library
moment().format(); // Use moment to format the current date and time

const loadAllData = (req, res) => {

    Customer.find().then(customers => {
        res.render('index.ejs', { title: 'Home Page', customers: customers, moment: moment });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving customers from database');
    });

}

const searchData = (req, res) => {

    const searchText = req.body.txtSearch.trim();

    Customer.find({ $or: [{ firstName: searchText }, { lastName: searchText }] }).then(customers => {
        res.render('user/search.ejs', { title: 'Search User Page', customers: customers, moment: moment });
    }
    ).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving customers from database');
    });

}

const getCustomerDataById = (req, res) => {

    Customer.findById(req.params.id).then(user => {
        res.render('user/view.ejs', { title: 'View User Page', customer: user, moment: moment })
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
    });

}

const deleteCustomerDataById = (req, res) => {
    // one way to delete => Customer.findByIdAndDelete(req.params.id)

    Customer.findOneAndDelete({ _id: req.params.id }).then(() => {
        console.log('Customer deleted successfully!');
        res.redirect('/');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error deleting customer from database');
    });
}


module.exports = { loadAllData, searchData, getCustomerDataById, deleteCustomerDataById };