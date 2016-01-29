angular.module('app.controllers.UsersEdit', ['app.services.Users'])
  .controller('UsersEditCtrl', function ($scope, $stateParams, $state, $mdToast, UsersService) {
    console.log($stateParams);
    $scope.user = {};
    //$scope.user.fullname = $stateParams.fullname;
    var _username = $stateParams.username;
    //$scope.user.isAdmin = $stateParams.isAdmin == 'Y' ? true : false;
    //$scope.user.isActive = $stateParams.isActive == 'Y' ? true : false;

    $scope.go = function (state) {
      $state.go(state);
    };

    UsersService.detail(_username)
    .then(function (user) {
      $scope.user.fullname = user.fullname;
      $scope.user.username = user.username;
      $scope.user.isAdmin = user.is_admin == 'Y';
      $scope.user.isActive = user.is_active == 'Y';
    }, function (err) {
      console.log(err);
      $mdToast.show(
        $mdToast.simple()
          .textContent('เกิดข้อผิดพลาด : ' + JSON.stringify(err))
          .position('right bottom')
          .hideDelay(3000)
      );
    });

    $scope.save = function () {
      if ($scope.user.fullname && $scope.user.username) {
        var user = {};
        user.fullname = $scope.user.fullname;
        user.username = $scope.user.username;
        user.password = $scope.user.password;
        user.isAdmin = $scope.user.isAdmin ? 'Y' : 'N';
        user.isActive = $scope.user.isActive ? 'Y' : 'N';

        UsersService.update(user)
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
