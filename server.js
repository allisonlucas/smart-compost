// Declare global variables
var express = require('express')
var app = express() // Create Express App Object
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')
var mongoose = require('mongoose')
var apiRoutes = require('./api_routes') //module.exports = apiRouter
var port = process.env.PORT || 80

// Connect to DB
mongoose.connect('mongodb://localhost/compost_db', function(err){
  if(err) console.log("Err connecting to mongodb")
  if(!err) console.log("Success connecting to mongodb")
})

// Application Configuration, apply middleware
app.use(logger('dev')) // Log all in-coming routes
app.use(bodyParser.json()) // Parse all form data to JSON
app.use(bodyParser.urlencoded({ extended: true })) // Allow url-encoded to be parsed
app.use(express.static(path.join(__dirname, './public'))) // serve your public files for the frontend

// Mount the api Routes
app.use('/api/v1', apiRoutes)

app.get('/users', function(req, res){
  res.sendFile('/home.html', {root : './public'})
})

// Listening for Connections
app.listen(port, function(err){
  if(!err) console.log('Server running on port: ' + port)
  if(err) console.log('Server crashed')
})
