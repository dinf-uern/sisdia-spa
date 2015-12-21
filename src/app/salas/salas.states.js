(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main.salas', {
        url: '/salas',
        abstract: true,
        templateUrl: 'app/salas/salas.view.html',
        controller: 'SalasController',
        controllerAs: 'ctrl'
      })

      .state('main.salas.listar', {
        url: '?:q',
        data: {
          title: 'Salas',
          leftSidenavPartialOnLarge: 'app/salas/salas.filters.view.html',
          rightSidenavPartialOnSmall: 'app/salas/salas.filters.view.html',
          floatingButtons: [
            {
              caption: 'Criar Sala',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.salas.criar' }
            },
          ]
        },
        resolve: {
          salas: function (Restangular) {
            return Restangular.all('salas').getList();
          }
        },
        templateUrl: 'app/salas/listar-salas.view.html',
        controller: 'ListarSalasController',
        controllerAs: 'ctrl'
      })

      .state('main.salas.criar', {
        url: '/criar',
        data: {
          title: 'Criar Sala',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/salas/criar-sala.view.html',
        controller: 'CriarSalaController',
        controllerAs: 'ctrl'
      });
  }

})();
