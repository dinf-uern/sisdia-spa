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
          title: 'Etiquetas',
          leftSidenavPartialOnLarge: 'app/tags/tags.filters.view.html',
          rightSidenavPartialOnSmall: 'app/tags/tags.filters.view.html',
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
              caption: 'Criar Etiqueta',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_add_24px.svg',
              action: { state: 'main.tags.criar' }
            },
          ]
        },
        templateUrl: 'app/tags/listar-tags.view.html',
        controller: 'ListarTagsController',
        controllerAs: 'ctrl'
      })

      .state('main.tags.criar', {
        url: '/criar',
        data: {
          title: 'Criar Etiqueta',
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
          title: 'Editar Etiqueta',
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
          title: 'Ver Etiqueta',
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
