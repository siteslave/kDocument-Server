
angular.module('app', ['ngMaterial'])
  .config(function ($mdThemingProvider) {

    // Theme configure
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '800', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      });
  })
.controller('MainCtrl', function ($scope) {

})
.controller('LoginCtrl', function ($scope, $http, $mdToast) {
  $scope.doLogin = function () {

    if ($scope.username && $scope.password) {
      $http.post('/users/admin-login', {username: $scope.username, password: $scope.password})
      .success(function (data) {
        if (data.ok) {
          location.href = '/';
        } else {
          $mdToast.show(
            $mdToast.simple()
              .textContent('เกิดข้อผิดพลาด : ' + JSON.stringify(data.msg))
              .position('right bottom')
              .hideDelay(3000)
          );
        }
      })
      .error(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent('เกิดข้อผิดพลาด : ไม่สามารถเชื่อมต่อกับ Server ได้')
            .position('right bottom')
            .hideDelay(3000)
        );
      })
    } else {
      $mdToast.show(
        $mdToast.simple()
          .textContent('กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน')
          .position('right bottom')
          .hideDelay(3000)
      );
    }
  }
});