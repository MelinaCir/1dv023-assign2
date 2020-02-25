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
  .post('/login', controller.loginPost)

module.exports = router
