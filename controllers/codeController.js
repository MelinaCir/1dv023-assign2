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

codeController.index = async (req, res, next) => {
  try {
    const codeData = {
      codes: (await Code.find({}))
        .map(snippet => ({
          id: snippet._id,
          code: snippet.code
        }))
    }

    res.render('code/index', { codeData })
  } catch (error) {
    next(error)
  }
}

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

    await codeSnippet.save()

    req.session.flash = {
      type: 'success',
      text: 'The code snippet was successfully created.'
    }
    res.redirect('../')
  } catch (error) {
    return res.render('code/new', {
      validationErrors: [error.message] || [error.errors.value.message],
      value: req.body.username
    })
  }
}

codeController.edit = async (req, res) => {
  res.render('/code/new')
}

codeController.update = async (req, res) => {
  try {
    const updated = await Code.updateOne({ _id: req.body.id }, {
      code: req.body.code
    })
  } catch (error) {
    req.session.flash = {
      type: 'fail',
      text: error.message
    }
    res.redirect('./edit')
  }
}

// Exports module.
module.exports = codeController
