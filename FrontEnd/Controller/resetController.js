// create the controller and inject Angular's $scope
myApp.controller('resetController', function($scope,$stateParams,resetservices) {
    $scope.id = $stateParams.token;
    $scope.reset = function(){
        let data = {};
        data.password = $scope.password;
        console.log(data);
        resetservices.reseet(data,$scope.id);
    }
});