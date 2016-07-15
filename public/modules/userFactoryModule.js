(function() {
  angular.module('userModule', [])
    .factory('userFact', userFact)

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

}())
