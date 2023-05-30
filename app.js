var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var oseDatabaseRouter = require('./routes/ose-database');
var employeeRouter = require('./routes/employee-database');

var app = express();

// connect to MongoDB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = 
  "mongodb+srv://SudoNoun:Y8EVRUpHoIlb98sG@osecontainmentdatabase.1anduce.mongodb.net/ose-website?retryWrites=true&w=majority"

async function main() {
  await mongoose.connect(mongoDB);
}

// throw error if failed to connect

main().catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/ose-database', oseDatabaseRouter);
app.use('/employee-database', employeeRouter);

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
