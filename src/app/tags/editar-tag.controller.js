(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('EditarTagController', EditarTagController);

  /** @ngInject */
  function EditarTagController($log, $state, $stateParams, dfNotify, Tag) {
    var vm = this;
    vm.loading = true;

    Tag.findById({id: $stateParams.id}, function(data){
      vm.data = data;
      vm.loading = false;
    });

    vm.onFormSubmit = function(){
      vm.data.$save(function(){
        $state.go('main.tags.listar');
      });
    }

  }
})();
