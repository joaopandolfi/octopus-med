
var NavigationController = {}

NavigationController.WorkLocal = (req,res) => {
    res.render('local.html', { hospitais: req.hospitais })
}

NavigationController.Config = (req, res) => {
    res.render('configuracao.html')
}

NavigationController.Home = (req,res) => {
    res.redirect('/local') // VERIFICAR
}

module.exports = NavigationController