myApp.service('loginservices',function($http){
    this.enter = function(data){
        console.log("dataobj...."+ data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/findone',
            data: data
        })
    .then(function(success){console.log("very Good",success);
    },function(error){console.log("Bad",error);
    })        
    }
})