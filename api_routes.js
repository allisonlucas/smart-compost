//IMPORT YOUR EXTERNAL MODULE'S
var
    ctrls = require('./controllers/userController'),
    apiRouter = require('express').Router()

// USE THE EXPRESS ROUTER TO DECLARE ROUTES
// app.get('/plates', func(){})
// app.post('/plates', func)
    apiRouter.route('/users')
      // .get(ctrls.usersController.all)
      .post(ctrls.usersController.create)


module.exports = apiRouter
