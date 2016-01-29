
angular.module('app', [
    'ngMaterial', 'md.data.table', 'ui.router',
    'app.controllers.Main', 'app.controllers.LeftNav',
    'app.controllers.Users', 'app.controllers.Files',
    'app.controllers.UsersAdd', 'app.controllers.UsersEdit'
  ])
  .config(function ($urlRouterProvider, $stateProvider, $mdThemingProvider) {

    // Theme configure
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '800', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      });

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: "/partials/admin/main.html",
        controller: 'MainCtrl'
      })
      .state('users', {
        url: "/users",
        templateUrl: "/partials/admin/users.html",
        controller: 'UsersCtrl'
      })
      .state('users-add', {
        url: "/users/add",
        templateUrl: "/partials/admin/users-add.html",
        controller: 'UsersAddCtrl'
      })
      .state('users-edit', {
        url: "/users/edit/:username",
        templateUrl: "/partials/admin/users-edit.html",
        controller: 'UsersEditCtrl'
      })
      .state('files', {
        url: "/files",
        templateUrl: "/partials/admin/files.html",
        controller: 'FilesCtrl'
      });
  })
  .controller('AppCtrl', function ($scope, $mdMedia, $rootScope, $state, $window, $timeout, $mdSidenav, Config) {

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }
  });