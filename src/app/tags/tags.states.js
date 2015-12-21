(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main.tags', {
        url: '/tags',
        abstract: true,
        templateUrl: 'app/tags/tags.view.html',
        controller: 'TagsController',
        controllerAs: 'ctrl'
      })

      .state('main.tags.listar', {
        url: '?:q',
        data: {
          title: 'Tags',
          leftSidenavPartialOnLarge: 'app/tags/tags.filters.view.html',
          rightSidenavPartialOnSmall: 'app/tags/tags.filters.view.html',
          floatingButtons: [
            {
              caption: 'Criar Tag',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.tags.criar' }
            },
          ]
        },
        resolve: {
          tags: function (Restangular) {
            return Restangular.all('tags').getList();
          }
        },
        templateUrl: 'app/tags/listar-tags.view.html',
        controller: 'ListarTagsController',
        controllerAs: 'ctrl'
      })

      .state('main.tags.criar', {
        url: '/criar',
        data: {
          title: 'Criar Tag',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/tags/criar-tag.view.html',
        controller: 'CriarTagController',
        controllerAs: 'ctrl'
      })

      .state('main.tags.editar', {
        url: '/editar/:id',
        data: {
          title: 'Editar Tag',
          leftSidenavFixedOnLarge: false,
          floatingButtons: [
            {
              caption: 'Salvar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_check_24px.svg',
              action: { event: 'ui.request-submit' }
            },
          ]
        },
        templateUrl: 'app/tags/editar-tag.view.html',
        controller: 'EditarTagController',
        controllerAs: 'ctrl'
      })

      .state('main.tags.ver', {
        url: '/ver/:id',
        data: {
          title: 'Ver Tag',
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
        templateUrl: 'app/tags/ver-tag.view.html',
        controller: 'VerTagController',
        controllerAs: 'ctrl'
      });
  }

})();
