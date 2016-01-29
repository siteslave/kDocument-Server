angular.module('app.controllers.Preview', ['app.directive.PDF'])
.controller('PreviewCtrl', function ($scope, $rootScope, $state, $window, $stateParams) {

  $scope.file = $stateParams.file;
  $scope.goHome = function () {
    //$state.go('document', {type: type, serial: serial, dateServ: dateServ});
    $state.go('document', {type: $rootScope.type, serial: $rootScope.serial, dateServ: $rootScope.dateServ});
  }
});