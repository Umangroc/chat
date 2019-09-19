const controller = require('../controllers/inputController')
const express = require('express')
const router = express.Router();

router.use('/register',controller.create)
router.post('/findone', controller.loginController);
router.post('/forgot', controller.forgotcontroller);
router.post('/reset', controller.resetcontroller);
module.exports = router;