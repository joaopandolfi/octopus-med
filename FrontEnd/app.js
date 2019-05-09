const express = require('express');
require('express-async-errors');
const app = express();
const nunjucks = require('nunjucks');
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var expressSession = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require("./configs/config")

const router = require('./routes');

app.set('view engine', 'html');
// Nunjucks
let njk_env = nunjucks.configure("views", {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});

// DB Setup
//db.setup()

// Cookie parser
app.use(cookieParser())
// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Session
app.use(expressSession({
    secret: 'o r3t0RnO d@ múm14 2.0: A origEm',
    resave: false,
    saveUninitialized: false
}))

// Chat socket
require('./chat')(io)

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);

// Public files
app.use('/public', express.static('public'));

app.use('/', router);

// Listen server
server.listen(config._port, function () {
    console.log(`Listening at: ${config._port}`)
});