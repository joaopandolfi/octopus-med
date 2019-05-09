var fetch = require('node-fetch')
var config = require(`../configs/config.js`)

var AuthController = {}

AuthController.Auth = async (req, res, next) => {
    var error = false
    var results = await fetch(`${config._server}/hospital`,
        { method: "GET", headers: { cookie: req.headers.cookie } }).catch(e => {
            error = true
            console.error(e)
        }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = {}
    if (!error) data = await results.json()
    if (!data && data.msg && data.msg == 'Auth Error') res.redirect('/login')
    else{
        req.hospitais = data
        next()
    }
}

AuthController.CheckAuth = (req,res, next) =>{
    let session = req.session;
    res.locals.username = session.username || false
    next()
}

AuthController.LoginPage = (req,res) =>{
    res.render('login.html',{config:config})
}

AuthController.Login =  (req, res) => {
    let { username } = req.body
    req.session.username = username
    console.log(`${username} connected.`)
    res.send('Ok')
}


module.exports = AuthController