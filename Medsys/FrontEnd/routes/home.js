const router = require('express').Router();
var navigationController = require("../controllers/navigationController")
var authController = require("../controllers/authController")

router.get('/',authController.Auth, navigationController.Home)

router.get('/local', authController.Auth, navigationController.WorkLocal)
router.get('/config/:hospital', authController.Auth, navigationController.Config)

module.exports = router