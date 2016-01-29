angular.module('app.services.Document', [])
  .factory('DocumentService', function ($q, $http) {
    return {
      getFileList: function (hn, type, dateServ, serial) {
        var q = $q.defer();

        var options = {
          url: '/documents/list',
          method: 'POST',
          data: {
            hn: hn,
            type: type,
            dateServ: dateServ,
            serial: serial
          }
        };

        $http(options)
        .success(function (data) {
          if (data.ok) {
            q.resolve(data.files)
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
  })