myApp.service('registerservices',function($http){
    this.registration = function(data){
        console.log("dataobj...."+ data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: data
        })
    .then(function(success){console.log("very Good",success);
    },function(error){console.log("Bad",error);
    })        
    }
})