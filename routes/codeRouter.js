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

// Routes paths for controller actions.
router
  .get('/new', controller.new)
  .post('/new', controller.create)

// Exports module.
module.exports = router
