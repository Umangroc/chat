const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/database.config')


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
    hash(password) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    register(data, callback) {
        let users = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: this.hash(data.password)
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
}
module.exports = new Input;