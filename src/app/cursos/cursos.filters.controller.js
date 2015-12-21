(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CursosFiltersController', CursosFiltersController);

  /** @ngInject */
  function CursosFiltersController($window, $state, $stateParams, dfSidenav) {
    var vm = this;

    vm.filters = {
      q: $stateParams.q ? $stateParams.q : ''
    };

    vm.aplicar = function(){
      $state.go('main.cursos.listar', vm.filters);
      dfSidenav.hideAll();
    }

    vm.limpar = function(){
      vm.filters.q = ''
      $state.go('main.cursos.listar', vm.filters);
      dfSidenav.hideAll();
    }

  }
})();
