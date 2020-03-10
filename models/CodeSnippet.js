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
  },
  user: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Creates a model for a new code snippet using the schema.
const CodeSnippet = mongoose.model('CodeSnippet', codeSnippetSchema)

// Exports module.
module.exports = CodeSnippet
