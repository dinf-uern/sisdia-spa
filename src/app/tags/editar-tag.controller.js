(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('EditarTagController', EditarTagController);

  /** @ngInject */
  function EditarTagController($log, $state, $stateParams, Restangular, dfNotify) {
    var Tags = Restangular.all('tags');
    var vm = this;
    vm.loading = true;

    Tags.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    vm.onFormSubmit = function(){
      vm.data.save().then(function(){
        $state.go('main.tags.listar');
      });
    }

  }
})();
