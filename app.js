const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
//   res.send('<h1>First App Hello World!</h1>')
    // res.sendFile(__dirname + '/views/home.html')
    res.sendFile('./views/home.html', { root: __dirname })
})

app.get('/success-page', (req, res) => {
    res.sendFile('./views/success-page.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})


mongoose.connect('mongodb+srv://eng_fawzi:PAtP3HKvVm8OLFJ7@cluster0.rkmonru.mongodb.net/all-data?appName=Cluster0')
  .then(() => console.log('Success Database Connected!'))
  .catch(err => console.error(err));


const LoginModel = require('./models/loginSchema'); // Import the LoginModel from the loginSchema.js file

app.post('/login', (req, res) => {

  const userLogin = new LoginModel(req.body); // Create a new instance of the LoginModel with the data from the request body

  userLogin.save().then(
    () => {
      console.log('Login data saved successfully');
      res.redirect('/success-page'); // Redirect back to the success page after processing the login data
    }
  ).catch(
    err => {
      console.error('Error saving login data:', err)
      res.redirect('/');
    } 
  ) // Save the login data to the database

  
});

/*const sql = require('mssql');
const config = require('./dbconfig');

async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');

        // let result = await sql.query`SELECT * FROM [Acc_Account]`; // Replace with your actual table name
        // console.log(result);
        
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

connectDB();*/
