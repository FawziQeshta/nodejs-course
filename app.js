const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
//   res.send('<h1>First App Hello World!</h1>')
    // res.sendFile(__dirname + '/views/home.html')
    res.sendFile('./views/home.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
