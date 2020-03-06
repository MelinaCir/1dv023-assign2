/**
 * CodeSnippet model.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Creates a schema for a new code snippet.
 */
const codeSnippetSchema = new Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}, {
  timestamps: true
})

const CodeSnippet = mongoose.model('CodeSnippet', codeSnippetSchema)

module.exports = CodeSnippet
