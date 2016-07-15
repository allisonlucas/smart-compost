// angular.module('CompostIt')
//     .controller('usersCtrl', usersController)
//
// usersController.$inject = ['$http']
// function usersController($http) {
//     var uCtrl = this
//
//     // Instantiating our newUser object with an array
//     uCtrl.newUser = {}
//
//     hCtrl.createUser = function () {
//         console.log(uCtrl.newUser)
//         $http.post('/api/v1/users', uCtrl.newUser)
//             .then(function (returnData) {
//                 // Reset the form back to default
//                 uCtrl.newUser = {}
//                 uCtrl.getUsers()
//             })
//     }
//
//     uCtrl.getUsers = function(){
//         $http.get('/api/v1/users')
//             .then(function(returnData){
//                 uCtrl.users = returnData.data
//             })
//     }
//     uCtrl.getUsers()
// }
