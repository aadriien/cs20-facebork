require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mongoRouter = require('./routes/mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));

//MongoDB
var MongoClient = require('mongodb').MongoClient
var testDB = (process.env.DEV_MODE === "true");
const uri = testDB ? 'mongodb://127.0.0.1:27017/facebork' : process.env.DBSTRING;
const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    await dbClient.connect();

    app.use('/', (req, res, next) => {
      req.client = dbClient;
      next();
    },
    indexRouter);

    app.use('/mongo/', (req, res, next) => {
      req.client = dbClient;
      next();
    },
    mongoRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({error : err});
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.err);

module.exports = app;
