
angular.module('app', [
  'ngMaterial', 'md.data.table', 'ui.router',
  'app.controllers.Main', 'app.controllers.Preview',
  'app.controllers.NavBar', 'app.service.Preview', 'app.controllers.Document',
  'app.controller.Login'
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
        templateUrl: "/partials/main.html",
        controller: 'MainCtrl'
      })
      .state('document', {
        url: "/document/:dateServ/:type/:serial",
        templateUrl: "/partials/documents.html",
        controller: 'DocumentCtrl'
      })
      .state('preview', {
        url: "/preview/:file",
        templateUrl: "/partials/preview.html",
        controller: 'PreviewCtrl'
      })
    .state('login', {
      url: '/login',
      templateUrl: '/partials/login.html',
      controller: 'LoginCtrl'
    })
  });