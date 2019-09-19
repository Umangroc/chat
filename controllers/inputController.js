const service = require('../services/services');
const valid = require('express-validator')

// Create and Save a new Note
exports.create = (req, res) => {

    let response = {};

    req.checkBody('firstName', 'FirstName is required').notEmpty();
    req.checkBody('lastName', 'LastName is required').notEmpty();
    req.checkBody('password').isLength({ min: 6 });
    req.checkBody('email').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        response.success = false;
        response.message = "validation error";
        response.errors = errors;
        return res.status(400).send(response);
    }
    else {
        var registerObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        service.services(registerObj, (error, result) => {
            if (error) {
                response.success = false;
                response.errors = error;
                return res.status(400).send(response)
            } else {
                response.success = true;
                response.errors = result;
                return res.status(200).send(response)
            }
        })

    };
}
exports.loginController = (req, res) => {
    let response = {};
    service.loginService(req.body, (err, result) => {
        if (err) {

            response.success = false;
            response.errors = err;
            //response.message ="email not found";
            return res.status(400).send(response);
        }
        else {
            response.success = true;
            response.result = result;
            response.message = "login successful";
            return res.status(200).send(response);
        }

    })

}
exports.forgotcontroller = (req, res) => {
    let response = {};
    service.forgotService(req.body, (err, result) => {
        if (err) {

            response.success = false;
            response.errors = err;
            return res.status(400).send(response);
        }
        else {
            response.success = true;
            response.result = result;
            response.message = " successful";
            return res.status(200).send(response);
        }

    })

}

exports.resetcontroller = (req, res) => {
    let response = {};
    service.resetService(req.body, (err, result) => {
        if (err) {
            response.success = false;
            response.errors = err;
            return res.status(400).send(response);
        }
        else {
            response.success = true;
            response.result = result;
            response.message = " successful";
            return res.status(200).send(response);
        }

    })

}
