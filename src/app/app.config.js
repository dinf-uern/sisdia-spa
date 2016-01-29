(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(config);

  /** @ngInject */
  function config($windowProvider, $logProvider, $httpProvider, $urlRouterProvider, $mdThemingProvider, RestangularProvider, dfMainMenuProvider) {
    var $window = $windowProvider.$get();
    var baseUrl = 'http://localhost:3500/v1';

    var env = $window.location.hostname === 'sisdia.dev.apps.uern.br' ? 'stage' : 'development';

    var debugEnabled = env === 'development';

    if (env === 'stage')
      baseUrl = 'http://sisdia-api.dev.apps.uern.br/v1';

    $logProvider.debugEnabled(debugEnabled);

    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue')
      .warnPalette('red');

    var menuItems = [
      { caption: 'Início', action: {state: 'main.home'}, activeState: "main.home.*" },
      { caption: 'Etiquetas', action: {state: 'main.tags.listar'}, activeState: "main.tags.*" },
      { caption: 'Cursos', action: {state: 'main.cursos.listar'}, activeState: "main.cursos.*" },
      { caption: 'Salas', action: {state: 'main.salas.listar'}, activeState: "main.salas.*" },
      { caption: 'Turmas', action: {state: 'main.turmas.listar'}, activeState: "main.turmas.*" }
    ];

    menuItems.forEach(dfMainMenuProvider.addItem);

    RestangularProvider.setBaseUrl(baseUrl);
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin':'*'});
    RestangularProvider.setFullResponse(true);

    $httpProvider.interceptors.push('errorInterceptor');

    $urlRouterProvider.otherwise('/');

  }

})();
