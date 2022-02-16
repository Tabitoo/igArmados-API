var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDocs = require('swagger-jsdoc')
const swaggerOptions = require('./swaggerConfig/swaggerOptions')

const SPECS = swaggerJsDocs(swaggerOptions)

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.use('/', indexRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(SPECS))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res,next) => {
  if (!err.msg) err.msg = err.message;
  delete err.message;

  const isDevEnv = req.app.get('env') === 'development';
  if(isDevEnv) err.stackTrace = err.stack.split("\n");

  res.status(err.status || 500).json(err);
});

module.exports = app;
