//IIFE FOR VARIABLE ENCAPSULATION
(function() {
  angular.module('routerModule', ['ui.router'])
    .config(configRouter)
    configRouter.$inject = ['$stateProvider', '$urlRouterProvider']

    function configRouter($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home',{
        url: '/',
        templateUrl: 'home.html',
        // controller: 'homeCtrl as hCtrl'
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
        .state('welcome',{
          url: '/welcome',
          templateUrl: 'partials/welcome.html',
          // controller: 'welcomeCtrl as wCtrl'
        })
      $urlRouterProvider.otherwise('/')
    }
}())
