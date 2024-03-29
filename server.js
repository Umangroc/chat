const express = require('express');
const bodyParser = require('body-parser');
const router = require('../app/routes/chatRoutes')
const valid = require('express-validator')

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(valid());
app.use(express.static('../app/FrontEnd'));
// Configuring the database
const dbConfig = require('../app/config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Require routes
app.use('/',router);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});