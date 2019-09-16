const model = require('../models/model')

exports.services = (data,callback) => {
    model.register(data,(error,result)=>{
        if(error){
            callback(error)
        }else{
            console.log("Service Worked");
            callback(null, result)
        }
    }) 
}

exports.loginService = (data, callback) => {
    model.login(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}