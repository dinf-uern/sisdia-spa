(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('VerSalaController', VerSalaController);

  /** @ngInject */
  function VerSalaController($log, $scope, $state, $stateParams, Restangular, dfNotify) {
    var Salas = Restangular.all('salas');

    var vm = this;
    vm.loading = true;

    Salas.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    $scope.$on('ui.request-remove', function(){
      if ( window.confirm('Tem certeza de deseja excluir \'' + vm.data.nome + '\'?') )
        vm.data.remove().then(function(){
          $state.go('main.salas.listar');
        });
    });

    $scope.$on('ui.request-edit', function(){
      $state.go('main.salas.editar', {id: vm.data.id});
    });

  }
})();
