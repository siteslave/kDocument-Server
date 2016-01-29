angular.module('app.services.File', [])
  .factory('FileService', function ($q, $http) {

    return {
      remove: function (file) {
        var q = $q.defer();

        var options = {
          url: '/admin/files/remove',
          method: 'POST',
          data: {file: file}
        };

        $http(options)
        .success(function (data) {
          if (data.ok) {
            q.resolve();
          } else {
            q.resolve(data.msg)
          }
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      }
    }
  });