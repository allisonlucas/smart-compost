//IIFE FOR VARIABLE ENCAPSULATION
// (function() {
  angular.module('routerModule', ['ui.router'])
    .config(configRouter)
    configRouter.$inject = ['$stateProvider', '$urlRouterProvider']

    function configRouter($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home',{
        url: '/',
        templateUrl: 'home.html',
        controller: 'homeCtrl as hCtrl'
        })
        .state('compost-this',{
          url: '/compost-this',
          templateUrl: 'partials/compost-this.html',
          controller: 'listCtrl as lCtrl'
        })
        .state('tracker',{
          url: '/tracker',
          templateUrl: 'partials/tracker.html',
          controller: 'chartCtrl as c'
        })
        // .state('users',{
        //     url : '/',
        //     templateUrl : 'home.html',
        //     controller : 'usersCtrl as uCtrl'
        // })
        .state('userPage', {
            url : '/users/:id',
            templateUrl : '/partials/tracker.html',
            controller : 'upCtrl as upCtrl'
        })
      $urlRouterProvider.otherwise('/')
    }
// }())
