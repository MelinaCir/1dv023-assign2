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

codeController.new = (req, res) => {
  res.render('code/new')
}

codeController.create = async (req, res) => {
  try {
    const codeSnippet = new Code({
      code: req.body.code
    })
    req.session.name = 'NewCodeSnippet'
    await codeSnippet.save()
  } catch (error) {
    return res.render('code/codes', {
      validationErrors: [error.message] || [error.errors.value.message],
      value: req.body.username
    })
  }
}
module.exports = codeController
