var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username    : String,
    email       : String,
    password    : String
})

var User = mongoose.model('User', userSchema)

module.exports = {User:User}
