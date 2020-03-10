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
  res.render('home/index')
}

// Exports module.
module.exports = homeController
