//IMPORT YOUR EXTERNAL MODULES
var
    ctrls = require('./controllers/userController'),
    apiRouter = require('express').Router()

// USE THE EXPRESS ROUTER TO DECLARE ROUTES

    apiRouter.route('/users')
      .get(ctrls.usersController.all)
      .post(ctrls.usersController.create)
    apiRouter.route('/users/:id')
      .post(ctrls.usersController.login)


module.exports = apiRouter
