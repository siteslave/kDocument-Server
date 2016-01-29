'use strict';

let express = require('express');
let router = express.Router();
let moment = require('moment');
let crypto = require('crypto');
let del = require('del');
let fs = require('fs');
let path = require('path');

let Users = require('../models/users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('admin/main')
});

router.post('/users', (req, res, next) => {
  let db = req.db;
  let username = req.body.username;
  let password = req.body.password;
  let fullname = req.body.fullname;
  let isAdmin = req.body.isAdmin;
  let isActive = req.body.isActive;

  if (username && password && fullname) {

    password = crypto.createHash('md5').update(password).digest('hex');

    let userData = {};
    userData.username = username;
    userData.fullname = fullname;
    userData.password = password;
    userData.is_admin = isAdmin;
    userData.is_active = isActive;
    userData.created_at = moment().format('YYYY-MM-DD HH:mm:ss');

    Users.save(db, userData)
      .then(() => {
        res.send({ok: true})
      }, (err) => {
        res.send({ok: false, msg: err})
      })

  } else {
    res.send({ok: false, msg: 'ข้อมูลไม่ครบ กรุณาตรวจสอบ'})
  }

});

router.post('/users/detail', (req, res, next) => {
  let db = req.db;
  let username = req.body.username;

  if (username) {
    Users.detail(db, username)
    .then((rows) => {
      res.send({ok: true, user: rows[0]})
    })
  } else {
    res.send({ok: false, msg: 'กรุณาระบุชื่อผู้ใช้งาน'})
  }
});

router.put('/users', (req, res, next) => {
  let db = req.db;
  let username = req.body.username;
  let password = req.body.password;
  let fullname = req.body.fullname;
  let isAdmin = req.body.isAdmin;
  let isActive = req.body.isActive;

  if (username && fullname) {

    let userData = {};
    userData.username = username;
    userData.is_admin = isAdmin;
    userData.fullname = fullname;
    userData.is_active = isActive;
    userData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

    if (password) {
      password = crypto.createHash('md5').update(password).digest('hex');
      userData.password = password;
      Users.updateWithPassword(db, userData)
        .then(() => {
          res.send({ok: true})
        }, (err) => {
          res.send({ok: false, msg: err})
        })
    } else {
      Users.updateWithOutPassword(db, userData)
        .then(() => {
          res.send({ok: true})
        }, (err) => {
          res.send({ok: false, msg: err})
        })
    }

  } else {
    res.send({ok: false, msg: 'ข้อมูลไม่ครบ กรุณาตรวจสอบ'})
  }

});

router.get('/users/list', (req, res, next) => {
  let db = req.db;

  Users.list(db)
  .then((rows) => {
    res.send({ok: true, rows: rows})
  }, (err) => {
    res.send({ok: false, msg: err})
  })

});

router.post('/files/remove', (req, res, next) => {
  //console.log(req.body.file);
  let file = req.body.file;
  let filePath = path.join('./public', file);
  //console.log(filePath);

  fs.access(filePath, function (err) {
    if (err) {
      res.send({ok: false, msg: 'File not found!'})
    } else {
      del.sync(filePath);
      res.send({ok: true})
    }
  });
});

router.delete('/users/:username', (req, res, next) => {
  let db = req.db;

  let username = req.params.username;
  if (username) {
    if (username == req.session.username) {
      res.send({ok: false, msg: 'ไม่สามารถลบตัวเองได้'})
    } else {
      Users.remove(db, username)
        .then(() => {
          res.send({ok: true})
        }, (err) => {
          res.send({ok: false, msg: err})
        })
    }

  } else {
    res.send({ok: false, msg: 'ไม่พบชื่อผู้ใช้งาน'})
  }


});

module.exports = router;
