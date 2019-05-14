var config = require('../configs/config')

var NavigationController = {}

NavigationController.WorkLocal = (req,res) => {
    res.render('local.html', { hospitais: req.hospitais, _server_back:config._server_back })
}

NavigationController.Config = (req, res) => {
    res.render('configuracao.html')
}

NavigationController.Home = (req,res) => {
    res.redirect('/local') // VERIFICAR
}

module.exports = NavigationController