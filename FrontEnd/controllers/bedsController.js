var fetch = require('node-fetch')
var config = require(`../configs/config.js`)

var bedsController = {}

bedsController.Table = (req, res) => {
    res.render('quadro.html', { leitos: req.session.leitos })
}


bedsController.GetUTIData = async (req, res) => {
    let { hospital, uti } = req.params
    req.session.hospital = hospital
    req.session.uti = uti
    var results = await fetch(`${config._server}/hospital/${hospital}/list/uti/${uti}/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.session.leitos = data || []
    res.render('quadro.html', {leitos: data, Idhospital: hospital})
}

bedsController.GetHospitalBeds = async (req, res) => {
    let { hospital } = req.params
    req.session.hospital = hospital
    req.session.uti = null
    var results = await fetch(`${config._server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.session.leitos = data || []
    res.render('quadro.html', { leitos: data, Idhospital: hospital  })
}

module.exports = bedsController