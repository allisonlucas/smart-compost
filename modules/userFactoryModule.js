(function() {
  //CREATE A SEPERATE MODULE FOR EACH JS FILE
  angular.module('userModule', [])
  //BELOW IS THE ACTUAL FACTORY
    .factory('userFact', userFact)
    //FUNCTION DECLARATION FOR THE FACTORY
    function userFact($http){
      var uFactory = {}
      //SEND A REQUEST TO OUR SERVER AND RETURN A PROMISE
      uFactory.create = function(user){
        return $http.post('/api/users', user)
      }

      uFactory.all = function(){
        return $http.get('/api/users')
      }

      return uFactory
    }

}());
