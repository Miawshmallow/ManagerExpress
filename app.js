var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var Sequelize = require("sequelize");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Posts } = require('./models');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var sess;
const oneDay = 1000 * 60 * 60 * 24;
var SequelizeStore = require("connect-session-sequelize")(session.Store);

// create database, ensure 'sqlite3' in your package.json
var sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./session.sqlite",
  logging: false,
});

// configure express
var app = express();
app.use(
  session({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
   
    saveUninitialized: true,
  })
);

sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname))
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
