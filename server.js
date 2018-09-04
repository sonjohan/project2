
// NPM Packages
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const db = require("./models");
// Config
var passport = require('./helpers/passport');
var secret = require('./config/keys');

var PORT = process.env.PORT || 8081;
var mode = process.env.NODE_ENV;
var app = express();

// MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Auth & Session Initialization
app.use(session({ secret: secret.key, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// Server
db.sequelize.sync().then(()=>{
app.listen(PORT, function () {
    if (mode !== 'production') {
        var opn = require('opn');
        opn(`http://localhost:${PORT}`, { app: ['google chrome'] })
    }
    console.log(`👋  Hey there I'm 👂 ing on Port: ${PORT}`);
});
});