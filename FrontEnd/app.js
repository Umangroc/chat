var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider,$urlRouterProvider) {

  var loginState = {
    name: "login",
    url: '/login',
    templateUrl: '../Templates/loginForm.html',
  }
  var forgotState = {
    name: "forgot",
    url: '/forgotpassword',
    templateUrl: '../Templates/forgot.html'
  }
  var registerState = {
    name: 'register',
    url: '/register',
    templateUrl: '../Templates/register.html',
    controller: 'registerController'
  }

  $stateProvider.state(loginState);
  $stateProvider.state(forgotState);
  $stateProvider.state(registerState);
  $urlRouterProvider.otherwise('/login');
});

