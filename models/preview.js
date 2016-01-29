"use strict";
let Q = require('q');

module.exports = {
  search(db, hn) {
    let q = Q.defer();

    db('patient')
    .where('hn', hn)
    .limit(1)
    .then((rows) => {
      q.resolve(rows[0])
    })
    .catch((err) => {
      q.reject(err)
    });

    return q.promise;
  },

  getOPD(db, hn) {
    let q = Q.defer();
    let sql = `select date_serv, time_serv, vn
      from services
      where an is null
      and hn=?
      order by date_serv desc
      limit 50`;

    db.raw(sql, [hn])
    .then((rows) => {
      q.resolve(rows[0])
    })
    .catch((err) => {
      q.reject(err)
    });

    return q.promise;
  },

  getIPD(db, hn) {
    let q = Q.defer();
    let sql = `select date_serv, time_serv, an
      from services
      where vn is null
      and hn=?
      order by date_serv desc
      limit 50`;

    db.raw(sql, [hn])
    .then((rows) => {
      q.resolve(rows[0])
    })
    .catch((err) => {
      q.reject(err)
    });

    return q.promise;
  }
}