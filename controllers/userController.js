'use strict'

//IMPORT MODEL OF DB COLLECTIONS
var User = require('../models/users')
var bcrypt = require('bcryptjs')
var errors = { // response errors
    general: {
        status: 500,
        message: 'Backend error'
    },
    login: {
        status: 403,
        message: 'Invalid username or password'
    }
}

//EXPORT CONTROLLER OBJECTS
module.exports = {
    // CREATE USERS CONTROLLER FOR ROUTE HANDLERS
    usersController: {
      // render: function(req, res) {
      //   res.render('home.html', req.session) // render the authenticaiton page (register/login)
      // },
      // welcome: function(req, res) {
      //   if (req.session.username) {
      //     res.redirect('/welcome')
      //   }
      // }
      all: function(req, res){
          console.log("Querying db for all user objects!")
          User.find({},function(error,users){
              if(error) console.log('Err finding users: ', error)
              if(!error){
                  res.json(users)
              }
          })
      },//end of my all method
      create: function(req,res){
          console.log("Data from signup form: ", req.body)
          var user = new User(req.body)
          user.save(function(err,user){
              if(err) console.log("Err saving new User: ", err)
              if(!err) {
                req.session.user = user
                res.json(user)
              }
          })
      },//end of create method
      login: function(req,res){
        console.log('Username: ', req.body.username)
        User.findOne({username: req.body.username}, function(error, user){
          if(error) console.log('error finding one user', error)
          if(!user) res.status(403).send(errors.login)
          else {
            console.info('hCtrl.login.user =', user)
                // If we got this far, then we know that the user exists. But did they put in the right password?
                bcrypt.compare(req.body.password, user.password, function (bcryptErr, matched) {
                    if (bcryptErr) {
                        console.error('Error decrypting password:', bcryptErr)
                        res.status(500).send(errors.general)
                    } else if (!matched) {
                        console.warn('Passwords do not match for:', user)
                        res.status(403).send(errors.login)
                    } else {
                        req.session.user = user // set the user in the session!
                        delete user.password // remove the hashed password before sending back the result
                        res.send(user) // send
                    }
                })
          }
        })
      },
      logout: function(req, res) {
        // req.session.reset()
        console.log('hello from logout in userController', req.session.user)
        req.session.user = null // clears the users cookie session
        res.redirect('/')
      },
      session: function(req, res, next){
        if( req.session.user ) {
            next()
        } else {
            res.redirect('/')
        }
      }
    }//end of my users controller
}
