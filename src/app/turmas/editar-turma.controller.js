(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('EditarTurmaController', EditarTurmaController);

  /** @ngInject */
  function EditarTurmaController($log, $state, $stateParams, Restangular, dfNotify) {
    var Turmas = Restangular.all('turmas');
    var vm = this;
    vm.loading = true;

    Turmas.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    vm.onFormSubmit = function(){
      vm.data.save().then(function(){
        $state.go('main.turmas.listar');
      });
    }

  }
})();
