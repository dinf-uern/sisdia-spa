(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(config);

  /** @ngInject */
  function config($logProvider, $urlRouterProvider, $mdThemingProvider, RestangularProvider, dfMainMenuProvider) {

    $logProvider.debugEnabled(true);

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
      { caption: 'Turmas', action: {state: 'main.turmas'} }
    ];

    menuItems.forEach(dfMainMenuProvider.addItem);

    RestangularProvider.setBaseUrl('http://localhost:3500/v1');
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin':'*'});
    RestangularProvider.setFullResponse(true);

    $urlRouterProvider.otherwise('/');

  }

})();
