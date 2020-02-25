/**
 * Home controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const moment = require('moment')

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

module.exports = homeController
