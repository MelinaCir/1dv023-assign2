/**
 * User controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const User = require('../models/User')

const userController = {}

/**
 * Renders login page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
userController.login = (req, res) => {
  res.render('user/login')
}

/**
 * Logs in a user if user has an account.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
userController.loginPost = async (req, res) => {
  try {
    const user = await User.authenticate(req.body.username, req.body.password)

    req.session.regenerate(() => {
      req.session.flash = {
        type: 'success',
        text: 'Welcome back ' + user.username + '!'
      }
      req.session.name = 'LoggedInUser'

      res.redirect('../')
    })
  } catch (error) {
    req.session.flash = {
      type: 'fail',
      text: 'Login attempt failed! Try again.'
    }
    res.redirect('./login')
  }
}

/**
 * Renders the page to register a new user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
userController.register = async (req, res) => {
  const viewData = {
    username: req.body.username,
    password: req.body.password
  }
  res.render('user/register', viewData)
}

/**
 * Registers a new user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
userController.create = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    req.session.name = 'NewUserRegistered'
    await user.save()

    req.session.flash = {
      type: 'success',
      text: 'The user ' + user.username + ' was successfully registered!'
    }
    res.redirect('../')
  } catch (error) {
    if (error.code === 11000) {
      return res.render('user/register', {
        validationErrors: ['User already exists! Pick another username.']
      })
    } else if (error.errors.password) {
      return res.render('user/register', {
        validationErrors: [error.errors.password.message]
      })
    }
  }
}

// Exports module.
module.exports = userController
