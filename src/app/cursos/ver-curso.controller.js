(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('VerCursoController', VerCursoController);

  /** @ngInject */
  function VerCursoController($log, $scope, $state, $stateParams, Restangular, dfNotify) {
    var Cursos = Restangular.all('cursos');

    var vm = this;
    vm.loading = true;

    Cursos.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    $scope.$on('ui.request-remove', function(){
      if ( window.confirm('Tem certeza de deseja excluir \'' + vm.data.nome + '\'?') )
        vm.data.remove().then(function(){
          $state.go('main.cursos.listar');
        });
    });

    $scope.$on('ui.request-edit', function(){
      $state.go('main.cursos.editar', {id: vm.data.id});
    });

  }
})();
