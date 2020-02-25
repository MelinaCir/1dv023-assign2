/**
 * The starting point of the application.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

require('dotenv').config()

const express = require('express')
// const session = require('express-session')
const logger = require('morgan')
const hbs = require('express-hbs')
const path = require('path')
const mongoose = require('./configs/mongoose.js')

const app = express()

mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

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
