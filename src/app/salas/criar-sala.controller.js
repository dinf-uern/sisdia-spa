(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarSalaController', CriarSalaController);

  /** @ngInject */
  function CriarSalaController($log, Restangular, $state, dfNotify, Sala) {
    var vm = this;

    vm.onFormSubmit = function(data){
      Sala.create(data, function(){
        dfNotify.show('Sala criada com sucesso!');
        $state.go('main.salas.listar');
      });
    }

  }
})();
