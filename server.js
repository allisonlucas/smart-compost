var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var apiRoutes  = require('./api_routes')

// Connect to DB
mongoose.connect('mongodb://localhost/compost')

// Create Express App Object
var app = express()

// Application Configuration
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// // Routes
app.use('/api/v1', apiRoutes)
// app.get('/users', function(req, res){
//   res.sendFile('/home.html', {root : './public'})
// });
//
// // User API routes
// var userCtrl = require('./controllers/userController.js')
// app.get('/api/users', userCtrl.get)
// app.get('/api/users/:id', userCtrl.get)
//
// app.post('/api/users', userCtrl.upsert)

// Creating Server and Listening for Connections
var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Server running on port ' + port)
})
