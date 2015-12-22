(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarTurmaController', CriarTurmaController);

  /** @ngInject */
  function CriarTurmaController($log, $state, $stateParams, Restangular, dfNotify) {
    var Turmas = Restangular.all('turmas');
    var vm = this;

    vm.data = {
      cor: "#005566",
      periodoInscricoes: {
        inicio: undefined,
        termino: undefined
      },
      periodoAulas: {
        inicio: undefined,
        termino: undefined
      },
      horarioAulas: {
        dias: []
      }
    };

    vm.inicioAulas = $stateParams.date;

    vm.onFormSubmit = function(data){
      Turmas.post(data).then(function(){
        //$state.go('main.turmas.listar');
      });
    }

  }
})();
