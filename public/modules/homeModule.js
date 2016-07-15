//IIFE FOR VARIABLE ENCAPSULATION
(function() {
  angular.module('homeModule', [])
    .controller('homeCtrl', homeController)

    homeController.$inject = ['userFact']

    function homeController(userFact){
      var hCtrl = this

      hCtrl.name = "Home Ctrl working"

      $('.parallax').parallax()

      // Instantiating our newUser object with an array
      // hCtrl.newUser = {}
      //
      // hCtrl.createUser = function () {
      //     console.log('User created: ', hCtrl.newUser)
      //     $http.post('/api/users', hCtrl.newUser)
      //         .then(function (returnData) {
      //           console.log('Data: ', returnData)
      //             // Reset the form back to default
      //             hCtrl.newUser = {}
      //             // hCtrl.getUsers()
      //         })
      // }

      userFact.all()
        .then(function(response){
          console.log("Data coming from our API all method: ",response)
          hCtrl.users = response.data
        })
        .catch(function(error){
          console.log("you had a server side error:", error)
        })

      //SUBMIT METHOD FOR ANGULAR FORM
      hCtrl.createUser = function(user){
        //MAKE THE API CALL FROM YOUR FACTORY OBJECT
        userFact.create(user)
          .then(function (response) {
            console.log("response from server create method",response)
          }, function(error){

          })
      }

    }

}())
