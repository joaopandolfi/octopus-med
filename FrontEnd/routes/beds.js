const router = require('express').Router();
var bedsController = require("../controllers/bedsController")
var authController = require("../controllers/authController")

router.get('/', authController.Auth, bedsController.Table)
router.post('/:hospital/:uti', authController.Auth, bedsController.GetUTIData)
router.post('/:hospital', authController.Auth, bedsController.GetHospitalBeds )


// router.get('/:hospital/:uti', auth, async(req, res) => {
//     let {hospital , uti} = req.params
//     var results = await fetch(`${_server}/hospital/${hospital}/list/uti/${uti}/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })/
//     let data = await results.json()
//     res.render('quadro.html', {leitos: data, Idhospital: hospital})
// })


// router.get('/:hospital', auth, async (req, res) => {
//     let { hospital } = req.params
//     var results = await fetch(`${_server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
//     let data = await results.json()
//     req.leitos = data
//     res.render('quadro.html', { leitos: data, Idhospital: hospital  })
// })


module.exports = router