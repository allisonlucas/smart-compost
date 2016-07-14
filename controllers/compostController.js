// Require the model
var Compost = require('../models/compost')

module.exports = {
  get : function(req, res) {

      if(req.params.id) {
          // Get One
          Compost.findOne({_id : req.params.id}, function(err, compost) {
              res.send(compost)
          })
      }
      else {
          // Get Many
          Compost.find({}, function(err, compost) {
              res.send(compost)
          })
      }

  },

  upsert : function(req, res) {
      if(req.params.id) {
          // Update
          Compost.update({_id : req.params.id}, req.body, function(err, updated) {
              if(err) {
                 return res.send(err)
              }
              res.send(updated)
          })
      }
      else {
          // Create
          var newCompost = new Compost(req.body)

          newCompost.save(function(err, doc) {
              res.send(doc)
          })
      }
  },

  delete : function(req, res) {

  }

}
