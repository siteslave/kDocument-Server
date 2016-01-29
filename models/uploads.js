'use strict';

let Q = require('q');
let moment = require('moment');

module.exports = {
  savePatient(db, patient) {
    let q = Q.defer();

    patient.created_at = moment().format('YYYY-MM-DD HH:mm:ss');

    db('patient')
      .insert(patient)
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  updatePatient(db, patient) {
    let q = Q.defer();

    patient.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

    db('patient')
      .where('hn', patient.hn)
      .update({
        fullname: patient.fullname,
        updated_at: patient.updated_at
      })
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  checkPatientDuplicated(db, patient) {
    let q = Q.defer();

    db('patient')
      .where('hn', patient.hn)
      .count('* as total')
      .then((rows) => {
        q.resolve(rows[0].total)
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  checkServiceDuplicated(db, service) {
    let q = Q.defer();

    db('services')
      .where('hn', service.hn)
      .where('vn', service.vn)
      .where('an', service.an)
      .count('* as total')
      .then((rows) => {
        q.resolve(rows[0].total)
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  saveService(db, service) {
    let q = Q.defer();

    service.created_at = moment().format('YYYY-MM-DD HH:mm:ss');

    db('services')
      .insert(service)
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;

  },

  updateService(db, service) {
    let q = Q.defer();

    service.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

    db('services')
      .where('hn', service.hn)
      .where('vn', service.vn)
      .where('an', service.an)
      .update({
        updated_at: service.updated_at,
        date_serv: service.date_serv,
        time_serv: service.time_serv
      })
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;

  }
};