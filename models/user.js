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
    unique: [true, 'User already exists!']
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

/**
 * Encrypts the password with salting and hashing using bcrypt.
 */
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Authenticates if the user exists in database and if password is correct.
 *
 * @param {string} username - The username trying to login.
 * @param {string} password - The plain text password to authenticate.
 *
 * @returns {object} Returns the logged in user.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Login attempt failed')
  }
  return user
}

// Creates a model for a user with the schema
const User = mongoose.model('User', userSchema)

// Exports model
module.exports = User
