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
              caption: 'Voltar',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_arrow_back_24px.svg',
              media: ['xs', 'sm', 'md'],
              action: {event: 'ui.request-back'}
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
