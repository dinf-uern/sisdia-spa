(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(config);

  /** @ngInject */
  function config($windowProvider, $logProvider, $httpProvider, $urlRouterProvider, $mdThemingProvider, RestangularProvider, dfMainMenuProvider) {
    var $window = $windowProvider.$get();
    var baseUrl = 'http://localhost:3500/v1';

    var env = $window.location.hostname === 'sisdia.herokuapp.com' ? 'stage' : 'development';

    var debugEnabled = env === 'development';

    if (env === 'stage')
      baseUrl = 'http://sisdia-api.herokuapp.com/v1';

    $logProvider.debugEnabled(debugEnabled);

    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue')
      .warnPalette('red');

    var menuItems = [
      { caption: 'Home', action: {state: 'main.home'} },
      { caption: 'Tags', action: {state: 'main.tags.listar'} },
      { caption: 'Cursos', action: {state: 'main.cursos.listar'} },
      { caption: 'Salas', action: {state: 'main.salas.listar'} },
      { caption: 'Turmas', action: {state: 'main.turmas.listar'} }
    ];

    menuItems.forEach(dfMainMenuProvider.addItem);

    RestangularProvider.setBaseUrl('http://localhost:3500/v1');
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin':'*'});
    RestangularProvider.setFullResponse(true);

    $httpProvider.interceptors.push('errorInterceptor');

    $urlRouterProvider.otherwise('/');

  }

})();
