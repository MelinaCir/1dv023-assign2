/**
 * Home Router.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/homeController')

router
  .get('/', controller.index)
  .get('/register', controller.register)
  .post('/create', controller.create)
  .get('/login', controller.login)
  .post('/login', controller.loginPost)

module.exports = router
