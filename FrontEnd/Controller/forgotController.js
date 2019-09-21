// create the controller and inject Angular's $scope
myApp.controller('forgotController', function($scope,forgotservices) {
    $scope.forget = function(){
        let data = {};
        data.email = $scope.email;
        console.log(data);
        forgotservices.forgot(data);
      }
});