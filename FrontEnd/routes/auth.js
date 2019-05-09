const router = require('express').Router();
var authController = require("../controllers/authController")

router.get('/*', authController.CheckAuth)
router.get('/login',authController.LoginPage)
router.post('/login', authController.Login)

module.exports = router