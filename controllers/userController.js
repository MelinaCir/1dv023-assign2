/**
 * User controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')
const User = require('../models/User')

const userController = {}

userController.login = (req, res) => {
  res.render('user/login')
}

userController.loginPost = async (req, res) => {
  try {
    const user = await User.authenticate(req.body.username, req.body.password)
    const loggedIn = req.session
    loggedIn.username = req.body.username

    req.session.regenerate(() => {
      req.session.flash = {
        type: 'success',
        text: 'Welcome back ' + user.username + '!'
      }
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

userController.register = async (req, res) => {
  const viewData = {
    username: req.body.username,
    password: req.body.password
  }
  res.render('user/register', viewData)
}

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
    console.log(error)
    return res.render('user/register', {
      validationErrors: 'User already exists! Pick another username.'
    })
  }
}

module.exports = userController
