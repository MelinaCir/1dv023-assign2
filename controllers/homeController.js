/**
 * Home controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const homeController = {}

/**
 * Renders the home page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = (req, res) => {
  if (req.session.loggedIn) {
    console.log('Name of session:', req.session.name)
  }
  res.render('home/index')
}

// Exports module.
module.exports = homeController
