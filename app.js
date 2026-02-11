const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

app.get('/', (req, res) => {
//   res.send('<h1>First App Hello World!</h1>')
    // res.sendFile(__dirname + '/views/home.html')
    res.sendFile('./views/home.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})


mongoose.connect('mongodb+srv://eng_fawzi:PAtP3HKvVm8OLFJ7@cluster0.rkmonru.mongodb.net/?appName=Cluster0')
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
