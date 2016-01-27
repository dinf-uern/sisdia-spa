(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main.turmas', {
        url: '/turmas',
        abstract: true,
        templateUrl: 'app/turmas/turmas.view.html',
        controller: 'TurmasController',
        controllerAs: 'ctrl'
      })

      .state('main.turmas.listar', {
        url: '?:calendarMode&:day',
        params: {
          calendarMode: 'agendaWeek'
        },
        data: {
          title: 'Turmas',
          leftSidenavPartialOnLarge: 'app/turmas/turmas.filters.view.html',
          rightSidenavPartialOnSmall: 'app/turmas/turmas.filters.view.html',
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
              caption: 'Criar Turma',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.turmas.criar' }
            },
          ]
        },
        resolve: {
          turmas: function(Restangular){
            return Restangular.all('turmas').getList({
              include: angular.toJson([
                {model: 'curso'}
              ])
            });
          }
        },
        templateUrl: 'app/turmas/listar-turmas.view.html',
        controller: 'ListarTurmasController',
        controllerAs: 'ctrl'
      })

      .state('main.turmas.criar', {
        url: '/criar?:date',
        data: {
          title: 'Criar Turma',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/turmas/criar-turma.view.html',
        controller: 'CriarTurmaController',
        controllerAs: 'ctrl'
      })

      .state('main.turmas.editar', {
        url: '/editar/:id',
        data: {
          title: 'Editar Turma',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/turmas/editar-turma.view.html',
        controller: 'EditarTurmaController',
        controllerAs: 'ctrl'
      })

      .state('main.turmas.ver', {
        url: '/ver/:id',
        data: {
          title: 'Ver Turma',
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
        templateUrl: 'app/turmas/ver-turma.view.html',
        controller: 'VerTurmaController',
        controllerAs: 'ctrl'
      });
  }

})();
