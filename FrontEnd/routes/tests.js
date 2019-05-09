const router = require('express').Router();
var fetch = require('node-fetch')
var config = require(`../configs/config.js`)

router.get('-rooms', async (req, res) => {
    // let { hospital, leito } = req.params
    var results = await fetch(`${config._server}/hospital/5ba3b2e74cf8a6be651b650e/list/rest/5ba457dc4cf8a6be65219ac1/intervention`, { method: "GET", headers: { cookie: req.headers.cookie } })
    let data = await results.json()

    res.render('teste-rooms.html', { data })
})

router.get('/:room', (req, res) => {
    let { room } = req.params
    res.render('test.html', { room })
})


module.exports = router