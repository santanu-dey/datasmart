var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/about');
var apis = require('./routes/apis');

var app = express();

// view engine setup
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for all requests

app.all('*', function (req, res, next) {  
  // Here let's do auth

  // Let's add cors
  var origin = req.get("origin")|| '*'
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'HEAD, GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Also enforce content-type
  if (req.method == 'POST' && !req.is('application/json')){
    var err = new Error('Bad Request: Content-Type must be application/json');
    err.status = 400;
    next(err);
  }

  next(); // pass control to the next handler
});

app.use('/', routes);
app.use('/v1', apis);
app.use('/v1/*', apis);
app.use('/about', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

app.use(function(err, req, res, next) {
  if (req.path.indexOf("v1") >= 0){
      res.set('Content-Type', "appliation/json")
      res.status(err.status||500).send({status:err.status, message: err.message}); 
  }
  else{

  res.render('error', {
    message: err.message,
    error: err
  });

  }

});




module.exports = app;
