angular.module('app.controllers.Document', ['app.services.Document'])
.controller('DocumentCtrl', function ($scope, $rootScope, $state, $window, $stateParams, DocumentService) {

  //console.log($scope.hn);

  var type = $stateParams.type;
  var serial = $stateParams.serial;
  var dateServ = $stateParams.dateServ;

  $rootScope.type = type;
  $rootScope.serial = serial;
  $rootScope.dateServ = dateServ;

  $scope.data = {};
  // get file list
  DocumentService.getFileList($rootScope.hn, type, dateServ, serial)
  .then(function (data) {
    $scope.data.files = data.files;
    $scope.data.path = data.urlPath;

  }, function (err) {
    console.log(err);
  });

  $scope.goHome = function () {
    $state.go('main');
  };

  $scope.doPreview = function (type, file) {

    var filePath = null;

    if (type == 'chart') {
      filePath = '../' + $scope.data.path.chart + '/' + file;
    } else if (type == 'xray') {
      filePath = '../' + $scope.data.path.xray + '/' + file;
    }  else if (type == 'ekg') {
      filePath = '../' + $scope.data.path.ekg + '/' + file;
    } else if (type == 'lab') {
      filePath = '../' + $scope.data.path.lab + '/' + file;
    } else {
      filePath = '../' + $scope.data.path.other + '/' + file;
    }

    $rootScope.filePath = filePath;

    if ($window.sessionStorage.getItem('logged')) {
      $state.go('preview', {file: filePath});
    } else {
      $state.go('login')
    }
  }
});