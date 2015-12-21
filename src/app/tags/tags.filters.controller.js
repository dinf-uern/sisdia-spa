(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TagsFiltersController', TagsFiltersController);

  /** @ngInject */
  function TagsFiltersController($window, $state, $stateParams, dfSidenav) {
    var vm = this;

    vm.filters = {
      q: $stateParams.q ? $stateParams.q : ''
    };

    vm.aplicar = function(){
      $state.go('main.tags.listar', vm.filters);
      dfSidenav.hideAll();
    }

    vm.limpar = function(){
      vm.filters.q = ''
      $state.go('main.tags.listar', vm.filters);
      dfSidenav.hideAll();
    }

  }
})();
