(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('VerTurmaController', VerTurmaController);

  /** @ngInject */
  function VerTurmaController($log, $scope, $state, $stateParams, Restangular, dfNotify) {
    var Turmas = Restangular.all('turmas');

    var vm = this;
    vm.loading = true;

    Turmas.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    $scope.$on('ui.request-remove', function(){
      if ( window.confirm('Tem certeza de deseja excluir \'' + vm.data.nome + '\'?') )
        vm.data.remove().then(function(){
          $state.go('main.turmas.listar');
        });
    });

    $scope.$on('ui.request-edit', function(){
      $state.go('main.turmas.editar', {id: vm.data.id});
    });

  }
})();
