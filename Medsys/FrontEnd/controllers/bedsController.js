var fetch = require('node-fetch')
var config = require('../configs/config.js')
var utils = require('../utils/utils')

var bedsController = {}


bedsController.Table = (req, res) => {
    res.render('quadro.html', { leitos: req.session.leitos, aside:utils.getAsideData(req) })
}

bedsController.GetUTIData = async (req, res) => {
    let { hospital, uti } = req.params
    req.session.hospital = hospital
    req.session.uti = uti
    var results = await fetch(`${config._server}/hospital/${hospital}/list/uti/${uti}/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.session.leitos = data || []
    res.render('quadro.html', {leitos: data, Idhospital: hospital, aside:utils.getAsideData(req), _server:config._server})
}

bedsController.GetHospitalBeds = async (req, res) => {
    let { hospital } = req.params
    req.session.hospital = hospital
    uti = req.session.uti // = null
    var results = await fetch(`${config._server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.session.leitos = data || []
    // Gerar relatório por leitos -> Fazer isso no backend e voltar resumo na rota
    res.render('quadro.html', { leitos: data, Idhospital: hospital, aside:utils.getAsideData(req), _server:config._server })
}

module.exports = bedsController