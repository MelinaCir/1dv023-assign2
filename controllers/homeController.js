/**
 * Home controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')
const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('home/index')
}

homeController.loginPost = async (req, res) => {
  try {
    const user = await User.authenticate(req.body.username, req.body.password)
    req.session.regenerate((error) => {
      if (error) {
        console.log('There was an error', error)
      }
    })
    console.log('Hello', user)
  } catch (error) {
    console.log('There was an error in the catch block', error)
  }
}
// TODO: render login page

homeController.register = async (req, res) => {
  const viewData = {
    value: undefined
  }
  res.render('home/register', viewData)
}

homeController.create = async (req, res) => {
  try {
    const user = new User({
      value: req.body.name
    })

    await user.save()

    req.session.flash = { type: 'success', text: 'The username was successfully saved!' }
    res.redirect('.')
  } catch (error) {
    return res.render('home/register', {
      validationErrors: [error.message] || [error.errors.value.message],
      value: req.body.name
    })
  }
}

module.exports = homeController
