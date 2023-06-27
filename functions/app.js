var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const serverless = require('serverless-http')

var usersRouter = require('../routes/users');
const companiesRouter = require('../routes/company')
const indexRouter = require('../routes/index')

const mongoose = require('../config/mongodb')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const router = express.Router()


var app = express();

//cors configuration
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/.netlify/functions/app/users', usersRouter);
app.use('/.netlify/functions/app/company', companiesRouter)
app.use('/.netlify/functions/app', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//JWT
app.set('key', 'SECRET_KEY')
function verifyToken(req, res, next){
  jwt.verify(req.headers['access-token'], req.app.get('key'), function(err, payload){
    if(err){
      res.status(400).json({message:err.message})
    }else{
      req.body.userID = payload.userID
      next()
    }
  })
}

app.verifyToken = verifyToken

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);
