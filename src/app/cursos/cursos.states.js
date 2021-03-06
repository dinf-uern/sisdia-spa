(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main.cursos', {
        url: '/cursos',
        abstract: true,
        templateUrl: 'app/cursos/cursos.view.html',
        controller: 'CursosController',
        controllerAs: 'ctrl'
      })

      .state('main.cursos.listar', {
        url: '?:q',
        data: {
          title: 'Cursos',
          leftSidenavPartialOnLarge: 'app/cursos/cursos.filters.view.html',
          rightSidenavPartialOnSmall: 'app/cursos/cursos.filters.view.html',
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
              caption: 'Criar Curso',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.cursos.criar' }
            },
          ]
        },
        templateUrl: 'app/cursos/listar-cursos.view.html',
        controller: 'ListarCursosController',
        controllerAs: 'ctrl'
      })

      .state('main.cursos.criar', {
        url: '/criar',
        data: {
          title: 'Criar Curso',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/cursos/criar-curso.view.html',
        controller: 'CriarCursoController',
        controllerAs: 'ctrl'
      })

      .state('main.cursos.editar', {
        url: '/editar/:id',
        data: {
          title: 'Editar Curso',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/cursos/editar-curso.view.html',
        controller: 'EditarCursoController',
        controllerAs: 'ctrl'
      })

      .state('main.cursos.ver', {
        url: '/ver/:id',
        data: {
          title: 'Ver Curso',
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
        templateUrl: 'app/cursos/ver-curso.view.html',
        controller: 'VerCursoController',
        controllerAs: 'ctrl'
      });
  }

})();
