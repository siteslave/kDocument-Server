'use strict';

let express = require('express');
let router = express.Router();
let crypto = require('crypto');

let Users = require('../models/users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('Welcome to kDoc server');
});

router.get('/login', (req, res, next) => {
  res.render('admin/login', {title: 'Login'})
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/users/login');
});

router.post('/login', (req, res, next) => {
  let db = req.db;
  let username = req.body.username;
  let password = req.body.password;
  
  password = crypto.createHash('md5').update(password).digest('hex');
  // do login
  Users.doLogin(db, username, password)
  .then((total) => {
    if (total) {
      req.session.username = username;
      res.send({ok: true})
    } else {
      res.send({ok: false, msg: 'Invalid username/password'})
    }
  }, (err) => {
    res.send({ok: false, msg: err})
  })
  
});

router.post('/admin-login', (req, res, next) => {
  let db = req.db;
  let username = req.body.username;
  let password = req.body.password;

  password = crypto.createHash('md5').update(password).digest('hex');
  // do login
  Users.doAdminLogin(db, username, password)
  .then((total) => {
    if (total) {
      req.session.username = username;
      res.send({ok: true})
    } else {
      res.send({ok: false, msg: 'Invalid username/password'})
    }
  }, (err) => {
    res.send({ok: false, msg: err})
  })

});

module.exports = router;
