'use strict'
const express = require('express')
const logger = require('morgan')
const hbs = require('express-hbs')
const path = require('path')

const app = express()

app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// here is other stuff
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/homeRouter'))

app.use('*', (req, res) => res
  .status(404)
  .send('404 Not Found'))

app.listen(8000, () => console.log('Server running on localhost:8000'))
