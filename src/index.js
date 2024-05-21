require('dotenv').config();
const express = require('express');//common js
const path = require('path');//common js

const app = express(); //app express
const port = process.env.PORT || 3000; //port 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/schedule', (req,res) => {
  res.render('datlich')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})