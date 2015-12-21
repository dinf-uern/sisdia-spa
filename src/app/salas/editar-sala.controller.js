(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('EditarSalaController', EditarSalaController);

  /** @ngInject */
  function EditarSalaController($log, $state, $stateParams, Restangular, dfNotify) {
    var Salas = Restangular.all('salas');
    var vm = this;
    vm.loading = true;

    Salas.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    vm.onFormSubmit = function(){
      vm.data.save().then(function(){
        $state.go('main.salas.listar');
      });
    }

  }
})();
