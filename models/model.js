const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/database.config')
const nodemailer = require('nodemailer')


const registerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

let User = mongoose.model('Registration', registerSchema);


class Input {
    encrypt(password) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var encrypt = bcrypt.hashSync(password, salt);
        return encrypt;
    }
    register(data, callback) {
        let users = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: this.encrypt(data.password)
        });
        users.save((error, result) => {
            console.log("Success");

            if (error) {
                console.log(error)
                callback(error)
            } else {
                console.log(result)
                callback(null, result)
            }
        });
    }
    login(data, callback) {
        console.log(".................")
        User.findOne({ email: data.email }, (err, res) => {
            if (err) {
                callback(err)
            } else if (!res) {

                callback({ message: "User not found." });
            }
            // console.log(data.password);
            // console.log(res.password);
            bcrypt.compare(data.password, res.password, (err, result) => {
                //console.log(result);

                if (result === true) {
                    // console.log('login success');
                    res.token = jwt.sign({ email: res.email, firstName: res.firstName, lastName: res.lastName }, config.secret, { expiresIn: "7d" });
                    return callback(null, res);
                } else {

                    //console.log('login failed');
                    return callback({ message: "Wrong password" });
                }
            })
        });
    }
    forgot(data, callback) {
        User.findOne({ email: data.email }, (err, result) => {
            if (err) {
                return callback(err)
            } else if (!result) {
                return callback({ message: "user not found" });
            }

            var resetToken = jwt.sign({ email: result.email }, config.secret, { expiresIn: "7d" });

            User.updateOne({ email: result.email }, { token: resetToken }, (err, info) => {
                if (err)
                    callback(err)
                else {  

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tommoody1107@gmail.com',
                    pass: 'bridgelabs'
                }
            });

            var mailOptions = {
                from: 'tommoody1107@gmail.com',
                to: data.email,
                subject: 'Forget Password',
                text: 'reset password link!' + '  ' + 'http://localhost:3000/resetPassword' + resetToken + '----'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })
});
}

    reset(data, callback) {
        
        var decoded = jwt.verify(data.token, config.secret);
        User.findOne({ email: decoded.email }, (err, res) => {
            if (err) {

                callback(err)
            }
            else {
                if (res.token == data.token) {
                    console.log(data.password);
                    
                    User.updateOne({ email: res.email }, { password: this.encrypt(data.password) }, (err, info) => {
                        if (err)
                            callback(err)
                        else
                            callback(info);
                    })
                }
                else {
                    console.log('password not set');
                }
            }
        })
    }

}
module.exports = new Input;