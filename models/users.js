'use strict';
let Q = require('q');

module.exports = {

  doLogin(db, username, password) {
    let q = Q.defer();
    db('users')
      .where('username', username)
      .where('password', password)
      .where('is_active', 'Y')
      .count('* as total')
      .then((rows) => {
        q.resolve(rows[0].total)
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  doAdminLogin(db, username, password) {
    let q = Q.defer();
    db('users')
      .where('username', username)
      .where('password', password)
      .where('is_active', 'Y')
      .where('is_admin', 'Y')
      .count('* as total')
      .then((rows) => {
        q.resolve(rows[0].total)
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  save(db, users) {
    let q = Q.defer();
    db('users')
      .insert(users)
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  updateWithOutPassword(db, user) {
    let q = Q.defer();
    db('users')
      .where('username', user.username)
      .update({
        fullname: user.fullname,
        is_admin: user.is_admin,
        is_active: user.is_active,
        updated_at: user.updated_at
      })
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  updateWithPassword(db, user) {
    let q = Q.defer();
    db('users')
      .where('username', user.username)
      .update({
        fullname: user.fullname,
        password: user.password,
        is_admin: user.is_admin,
        is_active: user.is_active,
        updated_at: user.updated_at
      })
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  list(db) {
    let q = Q.defer();
    db('users')
      .select()
      .orderBy('fullname', 'desc')
      .then((rows) => {
        q.resolve(rows)
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  detail(db, username) {
    let q = Q.defer();
    db('users')
      .where('username', username)
      .limit(1)
      .then((rows) => {
        q.resolve(rows)
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  },

  remove(db, username) {
    let q = Q.defer();
    db('users')
      .where('username', username)
      .del()
      .then(() => {
        q.resolve()
      })
      .catch((err) => {
        q.reject(err)
      });

    return q.promise;
  }
};