angular.module('app.services.Login', [])
  .factory('LoginService', function ($q, $http) {
    return {
      doLogin: function (username, password) {
        var q = $q.defer();
        $http.post('/users/login', {username: username, password: password})
        .success(function (data) {
          if (data.ok) q.resolve();
          else q.reject(data.msg);
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      }
    }
  });