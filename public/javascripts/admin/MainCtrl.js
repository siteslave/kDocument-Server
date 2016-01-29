angular.module('app.controllers.Main', [])
  .controller('MainCtrl', function ($scope) {
    $scope.logout = function () {
      location.href = '/users/logout';
    }
  });