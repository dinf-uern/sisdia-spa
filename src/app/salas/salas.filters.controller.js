(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('SalasFiltersController', SalasFiltersController);

  /** @ngInject */
  function SalasFiltersController($window, $state, $stateParams) {
    var vm = this;

    vm.filters = {
      q: $stateParams.q ? $stateParams.q : ''
    };

    vm.aplicar = function(){
      $state.go('main.salas.listar', vm.filters);
    }

  }
})();
