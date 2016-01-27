(function() {
  'use strict';

  angular
    .module('sisdia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/',
        data: {
          title: 'Início',
          leftButtons: [
            {
              caption: 'Menu',
              icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/navigation/svg/production/ic_menu_24px.svg',
              media: ['xs', 'sm', 'md'],
              action: {event: 'left-sidenav.toggle'}
            }
          ],
          leftSidenavFixedOnLarge: false
        },
        templateUrl: 'app/home/home.view.html',
        controller: 'HomeController',
        controllerAs: 'home'
      });
  }

})();
