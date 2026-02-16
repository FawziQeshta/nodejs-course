const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const editCustomerController = require('../controllers/editCustomerController');

router.get('/', homeController.loadAllData);

router.get('/editPage/:id', editCustomerController.getCustomerDataById)

router.get('/view/:id', homeController.getCustomerDataById);

router.post('/search', homeController.searchData);

router.delete('/delete/:id', homeController.deleteCustomerDataById);

router.put('/update/:id', editCustomerController.updateCustomerData)



module.exports = router;