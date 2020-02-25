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

homeController.indexPost = (req, res) => {
  const viewData = {
    name: req.body.name,
    password: req.body.password,
    dayName: moment().format('dddd')
  }

  res.render('home/index', { viewData })
}

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
