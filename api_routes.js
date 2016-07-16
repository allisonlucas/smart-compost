//IMPORT YOUR EXTERNAL MODULES
var
    userCtrl = require('./controllers/userController'),
    apiRouter = require('express').Router()

// USE THE EXPRESS ROUTER TO DECLARE ROUTES

    apiRouter.route('/users')
      .get(userCtrl.usersController.all)
      .post(userCtrl.usersController.create)
    apiRouter.route('/users/:id')
      .post(userCtrl.usersController.login)

module.exports = apiRouter
