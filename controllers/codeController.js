/**
 * Code controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

// const moment = require('moment')
const Code = require('../models/CodeSnippet')

const codeController = {}

/**
 * Renders the page for new code snippets.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
codeController.new = (req, res) => {
  res.render('code/new')
}

/**
 * Creates a new code snippet in the database.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
codeController.create = async (req, res) => {
  try {
    const codeSnippet = new Code({
      code: req.body.code
      // user: req.session.username
    })
    console.log('current user?', req.session.name)
    req.session.name = 'NewCodeSnippet'
    console.log('after', req.session.name)
    await codeSnippet.save()
  } catch (error) {
    return res.render('code/new', {
      validationErrors: [error.message] || [error.errors.value.message],
      value: req.body.username
    })
  }
}

// Exports module.
module.exports = codeController
