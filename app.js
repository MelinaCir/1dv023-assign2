/**
 * The starting point of the application.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

require('dotenv').config()

const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const hbs = require('express-hbs')
const path = require('path')
const httpError = require('http-errors')

const mongoose = require('./configs/mongoose.js')

const app = express()

// Connection the MongoDB
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// Set up for the view engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Request logger
app.use(logger('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Setup session
const sessionOptions = {
  name: 'YourCodeCookie',
  secret: 'Change this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax'
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionOptions.cookie.secure = true
}

app.use(session(sessionOptions))

// Middleware
app.use((req, res, next) => {
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  if (req.session.loggedIn) {
    res.locals.loggedIn = req.session.loggedIn
  }
  next()
})

// Routes
app.use('/', require('./routes/homeRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/code', require('./routes/codeRouter'))
app.use('*', (req, res, next) => next(httpError(404)))

// Routes for error messages
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, 'views', 'errors', '404.html'))
  }

  if (err.status === 403) {
    return res
      .status(403)
      .sendFile(path.join(__dirname, 'views', 'errors', '403.html'))
  }

  if (req.app.get('env') !== 'development') {
    return res
      .status(500)
      .sendFile(path.join(__dirname, 'views', 'errors', '500.html'))
  }
})

// Start listening for the application on port 8000
app.listen(8000, () => console.log('Server running on localhost:8000'))
