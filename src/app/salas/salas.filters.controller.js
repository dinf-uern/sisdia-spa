(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('SalasFiltersController', SalasFiltersController);

  /** @ngInject */
  function SalasFiltersController($window, $state, $stateParams, dfSidenav) {
    var vm = this;

    vm.filters = {
      q: $stateParams.q ? $stateParams.q : ''
    };

    vm.aplicar = function(){
      $state.go('main.salas.listar', vm.filters);
      dfSidenav.hideAll();
    }

    vm.limpar = function(){
      vm.filters.q = ''
      $state.go('main.salas.listar', vm.filters);
      dfSidenav.hideAll();
    }

  }
})();
