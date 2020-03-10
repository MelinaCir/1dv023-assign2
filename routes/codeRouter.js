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
  .get('/', controller.index)
  .get('/new', controller.new)
  .post('/new', controller.create)
  .get('/:id/edit', controller.edit)
  .post('/:id/update', controller.update)

// Exports module.
module.exports = router
