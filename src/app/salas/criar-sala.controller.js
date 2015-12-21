(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarSalaController', CriarSalaController);

  /** @ngInject */
  function CriarSalaController($log, $state, Restangular, dfNotify) {
    var Salas = Restangular.all('salas');
    var vm = this;

    vm.onFormSubmit = function(data){
      Salas.post(data).then(function(){
        $state.go('main.salas.listar');
      });
    }

  }
})();
