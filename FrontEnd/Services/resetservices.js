myApp.service('resetservices',function($http){
    this.reseet = function(data,token){
        console.log("dataobj...."+ data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/reset',
            headers:{
                'token': token
            },
            data: data
        })
    .then(function(success){console.log("very Good",success);
    },function(error){console.log("Bad",error);
    })        
    }
})