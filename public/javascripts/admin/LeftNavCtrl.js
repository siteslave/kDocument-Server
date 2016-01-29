angular.module('app.controllers.LeftNav', [])
  .controller('LeftNavCtrl', function ($scope, $state, $mdMedia) {

    $scope.go = function (state) {
      $state.go(state);
    }
  });