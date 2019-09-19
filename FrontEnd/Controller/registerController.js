// create the controller and inject Angular's $scope
myApp.controller('registerController', function($scope,registerservices) {
    console.log(".........................");
    
    $scope.register = function(){
        let data = {};
        data.firstName = $scope.firstName;
        data.lastName = $scope.lastName;
        data.email = $scope.email;
        data.password = $scope.password;
        console.log(data);
        registerservices.registration(data);
    }
});