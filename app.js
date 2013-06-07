// Module Dependencies
var express = require('express'),
   routes = require('./routes'),
   mongoose = require('mongoose'),
   mongo = require('mongodb'),
   passport = require('./auth'),
   mongoStore = require('connect-mongo')(express),
   moment = require('moment');

var app = module.exports = express();
global.app = app;

var config = require('./config.js');

// Connect to the database once
var DB = require('./database');
var db = new DB.startup('mongodb://localhost/'+config.dbname);

// Setup session store variables
var storeConf = {
   db: {
      db: config.dbname,
      host: 'localhost'
   },
   secret: config.sessionSecret
};

// Import top level navigation menu
app.locals.links = require('./navigation');

// provide site-wide variables
app.locals.config = config;

// use date manipulation tool moment
app.locals.moment = moment;

// App Config
app.configure(function(){
   app.set('views', __dirname + '/views');
   app.set('view engine', 'jade');
   // Middleware to highlight the current top level path
   app.use(function(req, res, next) {
      var current = req.path.split('/');
      res.locals.current = '/' + current[1];
      res.locals.url = 'http://' + req.get('host') + req.url;
      next();
   });
   app.use(express.bodyParser());
   app.use(express.cookieParser());
   app.use(express.methodOverride());
   app.use(express.session({
      secret: storeConf.secret,
      maxAge: new Date(Date.now() + 3600000),
      store: new mongoStore(storeConf.db)
   }));
   app.use(passport.initialize());
   app.use(passport.session());
   app.use(app.router);
   app.use(express.static(__dirname + '/public'));
});

//environment specific config
app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
   app.use(express.errorHandler());
});

// Load the router
require('./routes')(app);

var port = config.port;
app.listen(port, function() {
  console.log("Listening on " + port);
});