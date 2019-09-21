  // create the controller and inject Angular's $scope
  myApp.controller('loginController', function($scope,loginservices) {
    
    $scope.login = function(){
      let data = {};
      data.email = $scope.email;
      data.password = $scope.password;
      console.log(data);
      loginservices.enter(data);
    }
   
});