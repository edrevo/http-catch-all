var express = require('express');
var path = require('path');
var logger = require('morgan');
var loggerConfig = require('./configs/morgan.config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

loggerConfig.setup(logger);
app.use(logger(loggerConfig.log));

const errorsRoutes = require('./routes/errors.route');

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.status(200).send();
});

app.use('/errors', errorsRoutes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
