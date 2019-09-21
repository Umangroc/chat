var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider,$urlRouterProvider) {

  var loginState = {
    name: "login",
    url: '/login',
    templateUrl: '../Templates/loginForm.html',
    controller: 'loginController'
  }
  var forgotState = {
    name: "forgot",
    url: '/forgotpassword',
    templateUrl: '../Templates/forgot.html',
    controller: 'forgotController'
  }
  var registerState = {
    name: 'register',
    url: '/register',
    templateUrl: '../Templates/register.html',
    controller: 'registerController'
  }
  var resetState = {
    name: 'reset',
    url: '/reset/:token',
    templateUrl: '../Templates/reset.html',
    controller: 'resetController'
  }
  
  $stateProvider.state(loginState);
  $stateProvider.state(forgotState);
  $stateProvider.state(registerState);
  $stateProvider.state(resetState);
  $urlRouterProvider.otherwise('/login');
});

