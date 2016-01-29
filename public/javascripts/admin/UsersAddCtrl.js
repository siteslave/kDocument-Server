angular.module('app.controllers.UsersAdd', ['app.services.Users'])
  .controller('UsersAddCtrl', function ($scope, $state, $mdToast, UsersService) {

    $scope.user = {};

    $scope.go = function (state) {
      $state.go(state);
    };

    $scope.save = function () {

      console.log($scope.user);

      if ($scope.user.fullname && $scope.user.username && $scope.user.password) {
        var user = {};
        user.fullname = $scope.user.fullname;
        user.username = $scope.user.username;
        user.password = $scope.user.password;
        user.isAdmin = $scope.user.isAdmin ? 'Y' : 'N';
        user.isActive = $scope.user.isActive ? 'Y' : 'N';

        UsersService.save(user)
        .then(function () {
          $state.go('users');
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
            .textContent('ข้อมูลไม่สมบูรณ์ กรุณากรอกให้ครบ')
            .position('right bottom')
            .hideDelay(3000)
        );
      }
    }
  });