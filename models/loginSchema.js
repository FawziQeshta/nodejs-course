const mongoose = require('mongoose');

// define the schema (the structure of the login)
const loginSchema = new mongoose.Schema({
  email: String,
  password: String
});

// create the model based on the schema
// export the model to use it in other files 
module.exports = mongoose.model('Login', loginSchema);

