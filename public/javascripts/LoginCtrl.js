angular.module('app.controller.Login', ['app.services.Login'])
  .controller('LoginCtrl', function ($scope, $rootScope, $window, $state, $mdToast, LoginService) {
    $scope.doLogin = function () {
      if ($scope.username && $scope.password) {
        LoginService.doLogin($scope.username, $scope.password)
        .then(function () {
          // success
          $window.sessionStorage.setItem('logged', true);
          $state.go('preview', {file: $rootScope.filePath});
        }, function (err) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('เกิดข้อผิดพลาด : ' + JSON.stringify(err))
              .position('right bottom')
              .hideDelay(3000)
          );
        })
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('กรุณาระบุชื่อผู้ใช้งาน และ รหัสผ่าน')
            .position('right bottom')
            .hideDelay(3000)
        );
      }
    }
  });