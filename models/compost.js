var mongoose = require('mongoose')

var compostSchema = mongoose.Schema({
    day           : String,
    temperature   : Number,
    moisture      : Number
})

var Compost = mongoose.model('Compost', compostSchema)

module.exports = Compost
