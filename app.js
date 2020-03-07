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

const mongoose = require('./configs/mongoose.js')
// const MongoDBstore = require('connect-mongodb-session')

const app = express()

mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

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
  // store: new MongoDBstore({ mongooseConnection: mongoose.connection, db: 'sessions' }),
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
  next()
})

// Routes
app.use('/', require('./routes/homeRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/code', require('./routes/codeRouter'))

app.use('*', (req, res) => res
  .status(404)
  .send('404 Not Found'))

app.listen(8000, () => console.log('Server running on localhost:8000'))
