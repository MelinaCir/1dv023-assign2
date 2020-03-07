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

// Routes to index page.
router.get('/', controller.index)

// Exports module.
module.exports = router
