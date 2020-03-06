/**
 * Code Router.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/codeController')

router
  .get('/new', controller.new)
  .post('/new', controller.create)

module.exports = router
