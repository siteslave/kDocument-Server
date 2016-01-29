
angular.module('app.controllers.NavBar', [])
.controller('NavBarCtrl', function ($scope, $rootScope, PreviewService, $state) {
  $rootScope.hn = angular.element( document.querySelector( '#hn' ) ).val();
  $scope.patient = {};
  $scope.opdServices = [];

  //console.log($rootScope.hn);
  if ($rootScope.hn) {
    PreviewService.getPatientInfo($rootScope.hn)
    .then(function (patient) {
      $scope.patient.hn = patient.hn;
      $scope.patient.fullname = patient.fullname;

      $scope.getOPDService(patient.hn);
      $scope.getIPDService(patient.hn);

    }, function (err) {
      console.log(err);
    });
  }

  $scope.getOPDService = function (hn) {
    PreviewService.getOPDService(hn)
    .then(function (rows) {
      $scope.opdServices = rows;
    }, function (err) {
      console.log('Error: ' + err);
    })
  };

  $scope.getIPDService = function (hn) {
    PreviewService.getIPDService(hn)
    .then(function (rows) {
      $scope.ipdServices = rows;
    }, function (err) {
      console.log('Error: ' + err);
    })
  };

  $scope.getDocument = function (type, serial, dateServ) {
    //$rootScope.dateServ = dateServ;
    $state.go('document', {type: type, serial: serial, dateServ: dateServ});
  };
});