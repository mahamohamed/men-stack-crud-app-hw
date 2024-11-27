require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.render('index.ejs')
})

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method')) // new
const carCtrl = require('./controllers/cars')
app.use('/', carCtrl)
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
