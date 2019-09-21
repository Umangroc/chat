myApp.service('forgotservices',function($http){
    this.forgot = function(data){
        console.log("dataobj...."+ data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forgot',
            data: data
        })
    .then(function(success){console.log("very Good",success);
    },function(error){console.log("Bad",error);
    })        
    }
})