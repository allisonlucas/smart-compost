// Declare global variables
var express = require('express')
var app = express() // Create Express App Object
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')
var mongoose = require('mongoose')
var apiRoutes = require('./api_routes') //module.exports = apiRouter
var sessions = require('client-sessions')({ // session cookie
        cookieName : "_smartCompost", // cookie name (within document.cookies on the Frontend)
        secret: 'E87GUTJS98899SLDK28375CCMJ5641', // encryption secret
        requestKey: 'session', // stores the session cookie in req.session
        duration: 86400, // one week in seconds = 60 * 60 * 24
        cookie: {
            path:'/',           // set cookie on the root of the site so that all routes possess the cookie in `req.session`
            ephemeral: false,   // when true, cookie expires when the browser closes
            httpOnly: true,     // when true, cookie is not accessible from javascript
            secure: false       // when true, cookie will only be sent over SSL;
        }
    })
var port = process.env.PORT || 3000

// Connect to DB
mongoose.connect(
  // 'mongodb://localhost/compost_db',
  'mongodb://dummy:dummyDB@ec2-52-42-79-194.us-west-2.compute.amazonaws.com:27017/dummyDB',
  function(err){
    if(err) console.log("Err connecting to mongodb")
    if(!err) console.log("Success connecting to mongodb")
  })

// Application Configuration, apply middleware
app.use(logger('dev')) // Log all in-coming routes
app.use(bodyParser.json()) // Parse all form data to JSON
app.use(bodyParser.urlencoded({ extended: true })) // Allow url-encoded to be parsed
app.use(express.static(path.join(__dirname, './public'))) // serve your public files for the frontend
app.use(sessions) // mounting HTTPs session cookies

// Mount the api Routes
app.use('/api/v1', apiRoutes)

app.get('/users', function(req, res){
  res.sendFile('/home.html', {root : './public'})
  res.sendFile('/index.html', {root : './public'})
})

// Listening for Connections
app.listen(port, function(err){
  if(!err) console.log('Server running on port: ' + port)
  if(err) console.log('Server crashed')
})
