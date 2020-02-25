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
  const user = await this.find(username)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Login attempt failed')
  }

  return user
}

// Creates a model for a user with the schema
const User = mongoose.model('User', userSchema)

// Exports model
module.exports = User
