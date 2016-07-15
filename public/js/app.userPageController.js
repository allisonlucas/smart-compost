angular.module('CompostIt')
  .controller('upCtrl', userPageController)

userPageController.$inject = ['$http', '$stateParams']
function userPageController ($http, $stateParams){
    var upCtrl = this
    console.log($stateParams)

    $http.get('/api/v1/users/' + $stateParams.id)
        .then(function(returnData){
            upCtrl.user = returnData.data
        })

}
