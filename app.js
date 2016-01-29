"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var uploads = require('./routes/uploads');
var preview = require('./routes/preview');
var documents = require('./routes/documents');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'fsdfdjfdklfldfj234234234434dkfjsdkl',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

let auth = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/users/login')
  }
};

let db = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    database: 'kdoc',
    user: 'root',
    password: ''
  },
  charset: 'utf8'
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/uploads', uploads);
app.use('/preview', preview);
app.use('/documents', documents);

app.use('/admin', auth, admin);


module.exports = app;
