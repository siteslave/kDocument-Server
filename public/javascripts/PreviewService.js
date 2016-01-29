angular.module('app.service.Preview', [])
.factory('PreviewService', function ($q, $http) {
  return {
    getPatientInfo: function (hn) {
      var q = $q.defer();

      var options = {
        url: '/preview/patient/info',
        method: 'POST',
        data: {
          hn: hn
        }
      };

      $http(options)
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.patient)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed!')
      });

      return q.promise;
    },

    getOPDService: function (hn) {
      var q = $q.defer();

      var options = {
        url: '/preview/opd/services',
        method: 'POST',
        data: {
          hn: hn
        }
      };

      $http(options)
        .success(function (data) {
          if (data.ok) {
            q.resolve(data.services)
          } else {
            q.reject(data.msg)
          }
        })
        .error(function () {
          q.reject('Connection failed!')
        });

      return q.promise;
    },
    getIPDService: function (hn) {
      var q = $q.defer();

      var options = {
        url: '/preview/ipd/services',
        method: 'POST',
        data: {
          hn: hn
        }
      };

      $http(options)
        .success(function (data) {
          if (data.ok) {
            q.resolve(data.services)
          } else {
            q.reject(data.msg)
          }
        })
        .error(function () {
          q.reject('Connection failed!')
        });

      return q.promise;
    }
  }
});