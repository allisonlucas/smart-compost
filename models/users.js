'use strict'

var SALT_WORK_FACTOR = 10

var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema({
    username    : String,
    email       : String,
    password    : String,
    created     : Number // Date.now()
})

// hash passwords before saving them
userSchema.pre('save', function(next) {
    var user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next()
    }
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (saltErr, salt) {
        if (saltErr) {
            return next(saltErr)
        }
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (hashErr, hash) {
            if (hashErr) {
                return next(hashErr)
            }
            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

var User = mongoose.model('User', userSchema)

module.exports = User
