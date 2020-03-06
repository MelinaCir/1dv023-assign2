/**
 * User model.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

/**
 * Creates a schema for a new user.
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'Your password needs to be at least 10 characters long.']
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  console.log('This is the user: ', user.username)

  if (!user) console.log('User does not exist!')

  // bcrypt.compare(password, user.password, (err, data) => {
  //   console.log('what is data', data)
  //   if (err) {
  //     console.log(err, 'An error happened')
  //   }
  //   if (data) {
  //     console.log('Login successful!')
  //   } else {
  //     console.log('Login failed')
  //   }
  // })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Login attempt failed')
  }
  console.log('Hello my friend!')

  return user
}

// Creates a model for a user with the schema
const User = mongoose.model('User', userSchema)

// Exports model
module.exports = User
