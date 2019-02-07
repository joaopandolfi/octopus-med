const router = require('express').Router();
var fetch = require('node-fetch')
var config = require(`../configs/config.js`)

/** TODO
 * Jogar para dentro dos arquivos separados
 *  - ORGANIZAR ESSA BAGUNÇA -
 */

let auth = async (req, res, next) => {
    var error = false
    var results = await fetch(`${config._server}/hospital`,
        { method: "GET", headers: { cookie: req.headers.cookie } }).catch(e => {
            error = true
            console.error(e)
        }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = {}
    if (!error) data = await results.json()
    if (!data && data.msg && data.msg == 'Auth Error') res.redirect('/')
    else{
        req.hospitais = data
        next()
    }
}

router.get('/*', (req, res, next) => {
    let session = req.session;
    res.locals.username = session.username || false
    next()
})

/** (1)
 * Login Page
 */
router.get('/', (req, res) => {
    res.render('login.html')
})

router.get('/admin', (req, res) => {
    res.render('back-office.html')
})

router.get('/list-hospitais', auth, (req, res) => {
    res.render('list-hospitais.html', { hospitais: req.hospitais })
})

router.get('/hospital/:hospital/list/uti',  auth, async(req, res) => { 
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
  
  let qtdLeitos = leitos.length;

  res.render('list-utis.html', {utis: data, hospital: hospitalName, leitosQtd: qtdLeitos, hospitais: hospitais })
})

router.get('/interventions/:leito', async (req, res) => {
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
})

router.get('/teste-rooms', async (req, res) => {
    // let { hospital, leito } = req.params
    var results = await fetch(`${config._server}/hospital/5ba3b2e74cf8a6be651b650e/list/rest/5ba457dc4cf8a6be65219ac1/intervention`, { method: "GET", headers: { cookie: req.headers.cookie } })
    let data = await results.json()

    res.render('teste-rooms.html', { data })
})

router.get('/teste/:room', (req, res) => {
    let { room } = req.params

    res.render('test.html', { room })
})

router.get('/leitos', auth, (req, res) => {
    res.render('quadro.html', { leitos: req.session.leitos })
})

router.post('/leitos/:hospital/:uti', auth, async (req, res) => {
    let { hospital, uti } = req.params
    req.session.hospital = hospital
    req.session.uti = uti
    var results = await fetch(`${config._server}/hospital/${hospital}/list/uti/${uti}/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.session.leitos = data || []
    res.send('ok')
})

router.post('/leitos/:hospital', auth, async (req, res) => {
    let { hospital } = req.params
    req.session.hospital = hospital
    req.session.uti = null
    var results = await fetch(`${config._server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.session.leitos = data || []
    res.send('ok')
})



// router.get('/leitos/:hospital/:uti', auth, async(req, res) => {
//     let {hospital , uti} = req.params
//     var results = await fetch(`${_server}/hospital/${hospital}/list/uti/${uti}/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })/
//     let data = await results.json()
//     res.render('quadro.html', {leitos: data, Idhospital: hospital})
// })


// router.get('/leitos/:hospital', auth, async (req, res) => {
//     let { hospital } = req.params
//     var results = await fetch(`${_server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
//     let data = await results.json()
//     req.leitos = data
//     res.render('quadro.html', { leitos: data, Idhospital: hospital  })
// })

router.get('/condutas/leitos/:hospital', auth, async(req, res) => {
    let { hospital } = req.params
    var results = await fetch(`${config._server}/hospital/${hospital}/list/rest`, { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.leitos = data
    res.render('conduct-plan.html', { leitos: data, Idhospital: hospital  })
})

/** (2)
 * Select work local
 */
router.get('/local', auth, (req, res) => {
    res.render('local.html', { hospitais: req.hospitais })
})


/** (1.1)
 * Login endpoint
 */
router.post('/login', (req, res) => {
    let { username } = req.body
    req.session.username = username
    console.log(`${username} connected.`)
    res.send('Ok')
})

router.get('/config/:hospital', auth, (req, res) => {
    res.render('configuracao.html')
})


module.exports = router;