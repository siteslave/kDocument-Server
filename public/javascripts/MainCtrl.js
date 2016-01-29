
angular.module('app.controllers.Main', [])
.controller('MainCtrl', function ($scope, $rootScope, $state) {

  $scope.view = function () {
    $state.go('view', {hn: 12});
  };

});