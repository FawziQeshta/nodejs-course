const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const Customer = require('./models/customerSchema'); // Import the LoginModel from the loginSchema.js file
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from the 'public' directory
var moment = require('moment'); // Import the moment library
moment().format(); // Use moment to format the current date and time
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Auto refresh pages
const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require('connect-livereload');
const { get } = require('http');
app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});



app.get('/', (req, res) => {

  Customer.find().then(customers => {
    res.render('index.ejs', { title: 'Home Page', customers: customers, moment: moment });
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error retrieving customers from database');
  });

})


app.get('/user/add.html', (req, res) => {
  res.render('user/add.ejs', { title: 'Add User Page' })
})

app.get('/editPage/:id', (req, res) => {
  Customer.findById(req.params.id).then(user => {
    res.render('user/edit.ejs', { title: 'Edit User Page', customer: user })
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error retrieving user from database');
  });
})

app.get('/view/:id', (req, res) => {

  Customer.findById(req.params.id).then(user => {
    res.render('user/view.ejs', { title: 'View User Page', customer: user, moment: moment })
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error retrieving user from database');
  });

})

app.get('/user/search.html', (req, res) => {
  res.render('user/search.ejs', { title: 'Search User Page' })
})

app.post('/add-customer', (req, res) => {
  const customer = new Customer(req.body);

  customer.save().then(() => {
    console.log('Customer added successfully!');
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error saving customer to database');
  });

})

app.delete('/delete/:id', (req, res) => {  
  // one way to delete => Customer.findByIdAndDelete(req.params.id)

  Customer.findOneAndDelete({_id: req.params.id}).then(() => {
    console.log('Customer deleted successfully!');
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error deleting customer from database');
  });
})

app.put('/update/:id', (req, res) => {
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
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})


mongoose.connect('mongodb+srv://eng_fawzi:PAtP3HKvVm8OLFJ7@cluster0.rkmonru.mongodb.net/all-data?appName=Cluster0')
  .then(() => console.log('Success Database Connected!'))
  .catch(err => console.error(err));


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
