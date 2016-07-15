//IMPORT MODEL OF DB COLLECTIONS
var User = require('../models/users')

//EXPORT CONTROLLER OBJECTS
module.exports = {
    // CREATE PLATES CONTROLLER FOR ROUTE HANDLERS
    usersController: {
      all: function(req, res){
          console.log("Querying db for all user objects!")
          User.find({},function(error,users){
              if(error) console.log('Err finding plates: ', error)
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
                res.json(user)
              }
          })
      }//end of create method
    }//end of my users controller
}
