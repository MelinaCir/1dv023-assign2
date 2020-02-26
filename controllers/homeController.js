/**
 * Home controller.
 *
 * @author Melina Cirverius
 * @version 1.0.0
 */

'use strict'

const homeController = {}

homeController.index = (req, res) => {
  res.render('home/index')
}

module.exports = homeController
