(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        abstract: true,
        data: {
          leftButtons: [
            {
              caption: 'Menu',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_menu_24px.svg',
              media: ['sm', 'md'],
              action: {event: 'left-sidenav.toggle'}
            }
          ],
          rightButtons: [
            {
              caption: 'Filtros',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/content/svg/production/ic_filter_list_24px.svg',
              media: ['sm', 'md'],
              action: {event: 'right-sidenav.toggle'}
              caption: 'Voltar',
            }
          ],
          title: 'Sisdia',
          leftSidenavPartialOnSmall: 'app/main/menu.view.html',
          leftSidenavPartialOnLarge: '',
          leftSidenavFixedOnSmall: false,
          leftSidenavFixedOnLarge: true,
          rightSidenavPartialOnSmall: '',
          rightSidenavPartialOnLarge: '',
          rightSidenavFixedOnSmall: false,
          rightSidenavFixedOnLarge: false
        },
        templateUrl: 'app/main/main.view.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
      });
  }

})();
