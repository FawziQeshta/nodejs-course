const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from the 'public' directory
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const allRoutes = require('./routes/allRoutes');
const addCustomer = require('./routes/addUser');

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




app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})


mongoose.connect('mongodb+srv://eng_fawzi:PAtP3HKvVm8OLFJ7@cluster0.rkmonru.mongodb.net/all-data?appName=Cluster0')
  .then(() => console.log('Success Database Connected!'))
  .catch(err => console.error(err));


app.use(allRoutes);
app.use(addCustomer);

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
