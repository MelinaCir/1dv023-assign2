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
    console.log('hellohej', user)
    req.session.regenerate(() => {
      console.log('Heeeej')

      // const viewData = {
      //   name: req.body.name,
      //   dayName: moment().format('dddd')
      // }
      res.render('home/index')
    })
  } catch (error) {
    console.log('There was an error in the catch block', error)
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

    req.session.flash = { type: 'success', text: 'The user ' + user.username + ' was successfully registered!' }
    res.redirect('../')
  } catch (error) {
    return res.render('user/register', {
      validationErrors: [error.message] || [error.errors.value.message],
      value: req.body.username
    })
  }
}

module.exports = userController
