const jwt = require('jsonwebtoken');
const config = require('../config/database.config')
module.exports = {
    verify(req, res, next) {
        //console.log(req);
        
        var token = req.header("token");
        if (!token) return res.status(401).send("access denied, no token provided");
        try {
            const decoded = jwt.verify(token, "abc");
            req.user = decoded;
            next();
        }
        catch (ex) {
            console.log("error in the token verification", ex);
            res.status(400).send("invalid token");
        }
    }
}