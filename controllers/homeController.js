/**
 * Home controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const moment = require('moment')
const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('home/index')
}

homeController.login = (req, res) => {
  res.render('home/login')
}

homeController.loginPost = async (req, res) => {
  try {
    const user = await User.authenticate(req.body.username, req.body.password)
    req.session.regenerate((error) => {
      if (error) {
        console.log('There was an error', error)
      }
    })
    const viewData = {
      name: req.body.name,
      password: req.body.password,
      dayName: moment().format('dddd')
    }
    res.render('home/login', { viewData })
    console.log('hello', user)
  } catch (error) {
    console.log('There was an error in the catch block', error)
  }
}

homeController.register = async (req, res) => {
  const viewData = {
    username: req.body.username,
    password: req.body.password
  }
  res.render('home/register', viewData)
}

homeController.create = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
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
