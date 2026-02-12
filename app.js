const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const LoginModel = require('./models/loginSchema'); // Import the LoginModel from the loginSchema.js file
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from the 'public' directory


// Auto refresh pages
const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});



app.get('/', (req, res) => {
//   res.send('<h1>First App Hello World!</h1>')
    // res.sendFile(__dirname + '/views/home.html')
    res.render('home.ejs', { title: 'Home Login' }) // Render the home.ejs template and pass a title variable
    // بيتحكم في اسم الصفحة اللي هتظهر
})

app.get('/success-page', (req, res) => {
      LoginModel.find().then(
        (data) => {
            res.render('success-page.ejs', {userData: data.at(-1)}) // Render the success-page.ejs template and pass the retrieved login data as usersData
            // data.at(-1) is used to get the last element of the data array, which is the most recently added login data. This allows us to display the email of the user who just logged in on the success page.
        }
    ).catch(
        err => {
            console.error('Error retrieving login data:', err);
        }
    ) // Retrieve all login data from the database and log it to the console
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})


mongoose.connect('mongodb+srv://eng_fawzi:PAtP3HKvVm8OLFJ7@cluster0.rkmonru.mongodb.net/all-data?appName=Cluster0')
  .then(() => console.log('Success Database Connected!'))
  .catch(err => console.error(err));



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
