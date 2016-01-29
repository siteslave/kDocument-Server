angular.module('app.controllers.Users', ['app.services.Users'])
  .controller('UsersCtrl', function ($scope, $state, $mdToast, $mdDialog, UsersService) {

    $scope.go = function (state) {
      $state.go(state);
    };

    $scope.edit = function (user) {
      $state.go('users-edit', {username: user.username});
    };

    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.getList = function () {
      UsersService.list()
      .then(function (rows) {
        $scope.users = rows;
      }, function (err) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('เกิดข้อผิดพลาด : ' + JSON.stringify(err))
            .position('right bottom')
            .hideDelay(3000)
        );
      })
    };

    // remove user
    $scope.remove = function (ev, username) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .textContent('คุณต้องการลบรายการนี้ ใช่หรือไม่?')
        .ariaLabel('Confirmation')
        .targetEvent(ev)
        .ok('ใช่')
        .cancel('ไม่ใช่');
      $mdDialog.show(confirm).then(function() {
        UsersService.remove(username)
        .then(function () {
          $scope.getList();
          $mdToast.show(
            $mdToast.simple()
              .textContent('ลบรายการเสร็จเรียบร้อยแล้ว')
              .position('right bottom')
              .hideDelay(3000)
          );
        }, function (err) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('เกิดข้อผิดพลาด : ' + JSON.stringify(err))
              .position('right bottom')
              .hideDelay(3000)
          );
        })
      }, function() {
        console.log('cancel')
      });
    };

    $scope.getList();

  });