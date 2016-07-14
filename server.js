var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb://localhost/compost')

// Create Express App Object
var app = express()

// Application Configuration
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Routes
app.get('/', function(req, res){
  res.sendFile('/html/home.html', {root : './public'})
})

// Creating Server and Listening for Connections
var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Server running on port ' + port)
})
