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
          leftButtons: [
            {
              caption: 'Menu',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_menu_24px.svg',
              media: ['xs', 'sm', 'md'],
              action: {event: 'left-sidenav.toggle'}
            }
          ],
          rightButtons: [
            {
              caption: 'Filtros',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_filter_list_24px.svg',
              media: ['xs', 'sm', 'md'],
              action: {event: 'right-sidenav.toggle'}
            }
          ],
          floatingButtons: [
            {
              caption: 'Criar Sala',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.salas.criar' }
            },
          ]
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
      })

      .state('main.salas.editar', {
        url: '/editar/:id',
        data: {
          title: 'Editar Sala',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/salas/editar-sala.view.html',
        controller: 'EditarSalaController',
        controllerAs: 'ctrl'
      })

      .state('main.salas.ver', {
        url: '/ver/:id',
        data: {
          title: 'Ver Sala',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Remover',
              icon: 'bower_components/material-design-icons/content/svg/production/ic_clear_24px.svg',
              action: { event: 'ui.request-remove' },
              class: 'md-fab md-warn md-hue-2'
            },
            {
              caption: 'Editar',
              icon: 'bower_components/material-design-icons/image/svg/production/ic_edit_24px.svg',
              action: { event: 'ui.request-edit' }
            },
          ]
        },
        templateUrl: 'app/salas/ver-sala.view.html',
        controller: 'VerSalaController',
        controllerAs: 'ctrl'
      });
  }

})();
