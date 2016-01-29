'use strict';

var express = require('express');
var router = express.Router();

let documents = require('../models/documents');
/* GET home page. */
router.post('/list', function(req, res, next) {
  let serial = req.body.serial;
  let type = req.body.type;
  let dateServ = req.body.dateServ;
  let hn = req.body.hn;

  let files = documents.getFileList(hn, type, dateServ, serial);

  res.send({ok: true, files: files})

});

module.exports = router;
