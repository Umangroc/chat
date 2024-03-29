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
exports.forgotService = (data, callback) => {
    model.forgot(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.resetService = (data, callback) => {
    model.reset(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.getService = (data,callback) => {
    model.getUsers(data,(err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}