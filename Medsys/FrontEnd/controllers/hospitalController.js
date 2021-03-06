var fetch = require('node-fetch')
var config = require(`../configs/config.js`)
var utils = require('../utils/utils')

var hospitalController = {}

hospitalController.List = (req, res) => {
    res.render('list-hospitais.html', { hospitais: req.hospitais, _server: config._server_back , aside:utils.getAsideData(req) })
}

hospitalController.ListUTI = async(req, res) => { 
    // ID Hospital selected
    let {hospital} = req.params;
    // Object Array to all hospital
    let hospitais = req.hospitais;
    // Variable to assign name of hospital selected
    let hospitalName = '';
    // Loop for each hospital (item)
    hospitais.forEach((hosp) => {
      if (hosp.Id == hospital) {
        hospitalName = hosp.name;
      } 
    })
    var dataLeitos = await fetch(`${config._server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } })
    let leitos = await dataLeitos.json()
  
    var results = await fetch(`${config._server}/hospital/${hospital}/list/uti`, { method: "GET", headers: { cookie: req.headers.cookie } })
    let data = await results.json()
    
    if(leitos == null) leitos = []
      
    let qtdLeitos = leitos.length;
  
    res.render('list-utis.html', {utis: data, hospital: hospitalName, leitosQtd: qtdLeitos, hospitais: hospitais , _server: config._server_back, aside:utils.getAsideData(req)})
  }

module.exports = hospitalController