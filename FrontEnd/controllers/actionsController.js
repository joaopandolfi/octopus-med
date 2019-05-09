var fetch = require('node-fetch')
var config = require(`../configs/config.js`)
var utils = require('../utils/utils')

var ActionsController = {}

ActionsController.GetBedInterventions = async (req, res) => {
    let { leito } = req.params
    let { hospital } = req.session
    if (!hospital) {
        res.send([])
    }
    else {
        var results = await fetch(`${config._server}/hospital/${hospital}/list/rest/${leito}/intervention`, { method: "GET", headers: { cookie: req.headers.cookie } })
        let interventions = await results.json()

        // res.render('teste-rooms.html', { interventions })
        res.render('components/popup-intervention', { interventions })
    }
}

ActionsController.GetBedConductions = async(req, res) => {
    let { hospital } = req.params
    var results = await fetch(`${config._server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.leitos = data
    res.render('conduct-plan.html', { leitos: data, Idhospital: hospital ,aside:utils.getAsideData(req) })
}

module.exports = ActionsController