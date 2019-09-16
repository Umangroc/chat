const controller = require('../controllers/inputController')
const express = require('express')
const router = express.Router();

router.use('/register',controller.create)
router.post('/findone', controller.loginController);

module.exports = router;