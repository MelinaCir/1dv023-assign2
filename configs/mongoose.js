/**
 * Mongoose model.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

module.exports.connect = async () => {
  mongoose.connection.on('connected', () => console.log('Connection to Mongoose is open.'))
  mongoose.connection.on('error', error => console.error(`Connection to Mongoose resulted in an error: ${error}`))
  mongoose.connection.on('disconnected', () => console.log('Connection to Mongoose got disconnected.'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Connection to Mongoose got disconnected because the application is terminated.')
      process.exit(0)
    })
  })

  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
