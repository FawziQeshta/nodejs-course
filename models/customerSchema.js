const mongoose = require('mongoose');

// define the schema (the structure of the customer)
const customerSchema = new mongoose.Schema({
  firstName: String,    
  lastName: String,
  email: String,
  telephone: String,
  age: Number,
  country: String,
  gender: String
}, { timestamps: true });

// create the model based on the schema
// export the model to use it in other files
module.exports = mongoose.model('Customers', customerSchema);