(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TurmasFiltersController', TurmasFiltersController);

  /** @ngInject */
  function TurmasFiltersController($window, $state, $stateParams, dfSidenav) {
    var vm = this;

    vm.filters = {
      q: $stateParams.q ? $stateParams.q : ''
    };

    vm.aplicar = function(){
      $state.go('main.turmas.listar', vm.filters);
      dfSidenav.hideAll();
    }

    vm.limpar = function(){
      vm.filters.q = ''
      $state.go('main.turmas.listar', vm.filters);
      dfSidenav.hideAll();
    }

  }
})();
