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
          floatingButtons: [
            {
              caption: 'Criar Curso',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.cursos.criar' }
            },
          ]
        },
        resolve: {
          cursos: function (Restangular) {
            return Restangular.all('cursos').getList();
          }
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
        abstract: true,
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

      .state('main.cursos.editar.info', {
        url: '',
        templateUrl: 'app/cursos/editar-curso-info.view.html',
        controller: 'EditarCursoInfoController',
        controllerAs: 'ctrl'
      })

      .state('main.cursos.editar.tags', {
        url: '/tags',
        templateUrl: 'app/cursos/editar-curso-tags.view.html',
        controller: 'EditarCursoTagsController',
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
