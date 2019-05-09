const router = require('express').Router();
var actionsController = require("../controllers/actionsController")
var authController = require("../controllers/authController")

router.get('/interventions/:leito', actionsController.GetBedInterventions)
router.get('/condutas/leitos/:hospital', authController.Auth, actionsController.GetBedConductions)


module.exports = router