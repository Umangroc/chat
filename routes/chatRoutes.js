const controller = require('../controllers/inputController')
const express = require('express')
const router = express.Router();
const utility = require('../FrontEnd/utility');

router.use('/register',controller.create)
router.post('/findone', controller.loginController);
router.post('/forgot', controller.forgotcontroller);
router.post('/reset', utility.verify ,controller.resetcontroller);
module.exports = router;