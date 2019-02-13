var createError = require('http-errors');
var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoDB = require('./config/mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/books');
var quranSearchRouter = require('./routes/searchQuran');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// logging requests
var logPath = path.join(__dirname,'/log/http.log');
var accessLogStream = fs.createWriteStream(logPath, {flags: 'a'});
app.use(logger('common', {
    stream: accessLogStream
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);
app.use('/search-quran', quranSearchRouter);



module.exports = app;
