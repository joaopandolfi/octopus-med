const router = require('express').Router();
var hospitalController = require("../controllers/hospitalController")
var authController = require("../controllers/authController")

router.get('/list', authController.Auth, hospitalController.List)
router.get('/:hospital/list/uti',  authController.Auth, hospitalController.ListUTI )
  

module.exports = router