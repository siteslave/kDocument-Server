angular.module('app.services.Users', [])
  .factory('UsersService', function ($q, $http) {

    return {
      save: function (users) {
        var q = $q.defer();
        var options = {
          url: '/admin/users',
          method: 'POST',
          data: users
        };

        $http(options)
        .success(function (data) {
          if (data.ok) q.resolve();
          else q.reject(data.msg);
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      },

      update: function (users) {
        var q = $q.defer();
        var options = {
          url: '/admin/users',
          method: 'PUT',
          data: users
        };

        $http(options)
        .success(function (data) {
          if (data.ok) q.resolve();
          else q.reject(data.msg);
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      },

      list: function () {
        var q = $q.defer();

        $http.get('/admin/users/list')
        .success(function (data) {
          if (data.ok) q.resolve(data.rows);
          else q.reject(data.msg);
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      },

      remove: function (username) {
        var q = $q.defer();

        $http.delete('/admin/users/' + username)
        .success(function (data) {
          if (data.ok) q.resolve();
          else q.reject(data.msg);
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      },

      detail: function (username) {
        var q = $q.defer();

        $http.post('/admin/users/detail', {username: username})
        .success(function (data) {
          if (data.ok) q.resolve(data.user);
          else q.reject(data.msg);
        })
        .error(function () {
          q.reject('Connection failed!')
        });

        return q.promise;
      }
    }

  });