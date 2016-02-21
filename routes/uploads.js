'use strict';

const express = require('express');
const router = express.Router();
const fse = require('fs-extra');
const path = require('path');
const Random = require('random-js');
const multer  = require('multer');
const _ = require('lodash');
const shell = require('shelljs');
const moment = require('moment');

let uploadDir = './public/uploads';
let documentsPath = './public/documents';
let uploads = require('../models/uploads');

fse.ensureDirSync(documentsPath);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fse.ensureDirSync(uploadDir);
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    let rnd = new Random();
    let str = rnd.hex(20, true);
    cb(null, moment().format('x') + '-' + file.originalname);
    //cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.pdf') {
      return cb(null, false)
    }
    cb(null, true)
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', upload.array('files'), (req, res, next) => {

  let key = req.body.key;
  //console.log(key);

  if (key == 'aaf891ddefffa0914b4d17e701cf5bd493ec2504') {
    // Check documents dir
    fse.ensureDirSync(documentsPath);

    if (req.body.patient) {

      let fileDetail = JSON.parse(req.body.file_detail);
      let patient = JSON.parse(req.body.patient);

      if (fileDetail && patient && req.files.length) {

        // Create home folder
        let homeDir = path.join(documentsPath, patient.hn);
        fse.ensureDirSync(homeDir);

        // create service type folder
        let serviceTypeDir = null;

        if (patient.vn) { // OPD
          serviceTypeDir = path.join(homeDir, 'opd');
        } else { // IPD
          serviceTypeDir = path.join(homeDir, 'ipd');
        }

        fse.ensureDirSync(serviceTypeDir);

        // create service date folder
        let serviceDateDir = path.join(serviceTypeDir, patient.date_serv);
        fse.ensureDirSync(serviceDateDir);

        let visitDir = null;

        if (patient.vn) {
          visitDir = path.join(serviceDateDir, patient.vn);
        } else {
          visitDir = path.join(serviceDateDir, patient.an);
        }

        fse.ensureDirSync(visitDir);

        // 1 - CHART, 2 - X-RAY, 3 - EKG, 4 - LAB, 5 - OTHER
        // create service folder
        let chartPath = path.join(visitDir, 'chart');
        let xrayPath = path.join(visitDir, 'xray');
        let ekgPath = path.join(visitDir, 'ekg');
        let labPath = path.join(visitDir, 'lab');
        let otherPath = path.join(visitDir, 'other');

        fse.ensureDirSync(chartPath);
        fse.ensureDirSync(xrayPath);
        fse.ensureDirSync(ekgPath);
        fse.ensureDirSync(labPath);
        fse.ensureDirSync(otherPath);

        let dataFiles = [];

        req.files.forEach((v) => {
          let obj = {};
          let idx = _.findIndex(fileDetail, {fileName: v.originalname});

          if (idx >= 0) {
            obj.type = fileDetail[idx].type;
            obj.truePath = v.path;
            obj.trueFileName = v.filename;

            dataFiles.push(obj);
          }

        });

        // move file
        // 1 - CHART, 2 - X-RAY, 3 - EKG, 4 - LAB, 5 - OTHER
        dataFiles.forEach((v) => {
          let targetPath = '';
          if (v.type == '1') targetPath = chartPath;
          else if (v.type == '2') targetPath = xrayPath;
          else if (v.type == '3') targetPath = ekgPath;
          else if (v.type == '4') targetPath = labPath;
          else targetPath = otherPath;

          shell.mv(v.truePath, targetPath);

        });

        let dataPatient = {
          hn: patient.hn,
          fullname: patient.fullname
        };

        // check duplicated
        uploads.checkPatientDuplicated(req.db, dataPatient)
          .then((total) => {
            if (total > 0) {
              return uploads.updatePatient(req.db, dataPatient);
            } else {
              return uploads.savePatient(req.db, dataPatient);
            }
          })
          .then(() => {
            // save service
            let service = {
              hn: patient.hn,
              vn: patient.vn,
              an: patient.an,
              date_serv: patient.date_serv,
              time_serv: patient.time_serv
            };

            uploads.checkServiceDuplicated(req.db, service)
              .then((total) => {
                if (total > 0) {
                  console.log('update');
                  return uploads.updateService(req.db, service)
                } else {
                  return uploads.saveService(req.db, service)
                }
              });
          })
          .then(() => {
            res.send({ok: true})
          }, (err) => {
            res.send({ok: false, msg: err})
          });
      } else {
        res.send({ok: false, msg: 'ไม่พบข้อมูลที่ต้องการอัปโหลด'})
      }

    } else {
      res.send({ok: false, msg: 'กรุณาระบุข้อมูลผู้รับบริการ'})
    }

  } else {
    res.send({ok: false, msg: 'Invalid key.'})
  }

});

module.exports = router;
