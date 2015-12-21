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
          title: 'Home',
          leftSidenavFixedOnLarge: false
        },
        templateUrl: 'app/home/home.view.html',
        controller: 'HomeController',
        controllerAs: 'home'
      });
  }

})();
