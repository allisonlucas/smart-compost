//IMPORT MODEL OF DB COLLECTIONS
var User = require('../users')//{ plates : platesArray}

//alternate syntax for controller functions
// function all(req,res){
//     //code
// }
// module.exports ={
//     all: all
// }
//EXPORT CONTROLLER OBJECTS
module.exports = {
    // CREATE PLATES CONTROLLER FOR ROUTE HANDLERS
    usersController: {
      // all: function(req, res){
      //     console.log("Querying db for all user objects!")
      //     //db.plates.find(query to find the collection)
      //     //res.json(db.plates)//Or res.send(db.plates)
      //     User.find({},function(error,users){
      //         if(error) console.log(error)
      //         if(!error){
      //             res.json(users)
      //         }
      //     })
      // },//end of my all method
      create: function(req,res){
          console.log("Data from form: ", req.body)
          var user = new User(req.body)
          user.save(function(err,user){
              if(err) console.log(err)
              if(!err) res.json(user)
              //curl -H "Content-Type: application/json" -X POST -d '{"name":"xyz","category":"xyz", "price": 99}' http://localhost:1337/api/v1/plates
          })
          // res.json({status: 200, success: true, message: "Created new plate!"})
      }//end of create method
    }//end of my plates controller
}



// // Require the model
// var User = require('../models/users')
//
// module.exports = {
//   get : function(req, res) {
//
//       if(req.params.id) {
//           // Get One
//           User.findOne({_id : req.params.id}, function(err, user) {
//               res.send(user)
//           })
//       }
//       else {
//           // Get Many
//           User.find({}, function(err, users) {
//               res.send(users)
//           })
//       }
//
//   },
//
//   upsert : function(req, res) {
//       if(req.params.id) {
//           // Update
//           User.update({_id : req.params.id}, req.body, function(err, updated) {
//               if(err) {
//                  return res.send(err)
//               }
//               res.send(updated)
//           })
//       }
//       else {
//           // Create
//           var newUser = new User(req.body)
//
//           newUser.save(function(err, doc) {
//               res.send(doc)
//           })
//       }
//   },
//
//   delete : function(req, res) {
//
//   }
//
// }
