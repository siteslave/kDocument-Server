"use strict";

let express = require('express');
let router = express.Router();
let moment = require('moment');

let preview = require('../models/preview');

router.post('/patient/info', (req, res) => {
  let db = req.db;
  let hn = req.body.hn;

  if (hn) {
    preview.search(db, hn)
      .then((patient) => {
        if (patient) {
          res.send({ok: true, patient: patient})
        } else {
          res.send({ok: false, msg: 'No result!'})
        }

      }, (err) => {
        res.end({ok: false, msg: err})
      })
  } else {
    res.send({ok: false, msg: 'กรุณาระบุ HN'})
  }
});

router.post('/opd/services', (req, res) => {
  let db = req.db;
  let hn = req.body.hn;
  let opdService = [];

  if (hn) {
    preview.getOPD(db, hn)
      .then((services) => {
        services.forEach((v) => {
          let obj = {};
          obj.date_serv = moment(v.date_serv).format('YYYY-MM-DD');
          obj.date_serv_thai = v.date_serv ? moment(v.date_serv).format('DD/MM') + '/' + (parseInt(moment(v.date_serv).format('YYYY')) + 543) : '';
          obj.time_serv = v.time_serv ? moment(v.time_serv, 'HH:mm:ss').format('HH:mm') : '';
          obj.vn = v.vn;
          opdService.push(obj);
        });
        res.send({ok: true, services: opdService})
      }, (err) => {
        res.end({ok: false, msg: err})
      })
  } else {
    res.send({ok: false, msg: 'กรุณาระบุ HN'})
  }
});

router.post('/ipd/services', (req, res) => {
  let db = req.db;
  let hn = req.body.hn;
  let ipdService = [];

  if (hn) {
    preview.getIPD(db, hn)
      .then((services) => {
        services.forEach((v) => {
          let obj = {};
          obj.an = v.an;
          obj.date_serv = moment(v.date_serv).format('YYYY-MM-DD');
          obj.date_serv_thai = v.date_serv ? moment(v.date_serv).format('DD/MM') + '/' + (parseInt(moment(v.date_serv).format('YYYY')) + 543) : '';
          obj.time_serv = v.time_serv ? moment(v.time_serv, 'HH:mm:ss').format('HH:mm') : '';
          ipdService.push(obj);
        });
        res.send({ok: true, services: ipdService})
      }, (err) => {
        res.end({ok: false, msg: err})
      })
  } else {
    res.send({ok: false, msg: 'กรุณาระบุ HN'})
  }
});

/* GET home page. */
router.get('/opd', function(req, res, next) {
  let hn = req.query.hn;
  console.log(hn);
  res.render('preview', {title: 'Preview', hn: hn})
});

/* GET home page. */
router.get('/ipd', function(req, res, next) {
  console.log(req.query);

  res.render('index', { title: 'Express' });
});

module.exports = router;
