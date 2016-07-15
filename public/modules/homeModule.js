//IIFE FOR VARIABLE ENCAPSULATION
(function() {
  angular.module('homeModule', [])
    .controller('homeCtrl', homeController)

    homeController.$inject = ['userFact']

    function homeController(userFact){
      var hCtrl = this

      userFact.all()
        .then(function(response){
          console.log("Data coming from our API all method: ",response)
          hCtrl.users = response.data
        })
        .catch(function(error){
          console.log("you had a server side error:", error)
        })

      // SUBMIT METHOD FOR ANGULAR SIGNUP FORM
      hCtrl.createUser = function(user){
        //MAKE THE API CALL FROM YOUR FACTORY OBJECT
        userFact.create(user)
          .then(function (response) {
            console.log("response from server create method",response)
          }, function(error){
            console.log("err in create method", error)
          })
      }

      // AJAX call for parallax function
      $('.parallax').parallax()

    }

  }())
