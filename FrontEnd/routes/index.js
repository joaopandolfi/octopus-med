const router = require('express').Router();

// Routers
var authRouter = require("./auth")
var homeRouter = require("./home")
var adminRouter = require("./admin")
var bedsRouter = require("./beds")
var hospitalRouter = require("./hospital")
var actionsRouter = require("./actions")
var testsRouter = require("./tests")

// Delegating Routes
router.use("/",authRouter)
router.use("/",homeRouter)
router.use("/",adminRouter)
router.use("/",actionsRouter)
router.use("/leitos",bedsRouter)
router.use("/hospital",hospitalRouter)
router.use("/teste",testsRouter)

module.exports = router;