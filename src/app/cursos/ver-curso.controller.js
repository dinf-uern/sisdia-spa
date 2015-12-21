(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('VerCursoController', VerCursoController);

  /** @ngInject */
  function VerCursoController($log, $scope, $state, $stateParams, dfNotify, Curso) {
    var vm = this;
    vm.loading = true;

    Curso.findById({
      id: $stateParams.id,
      filter: {
        include:'tags'
      }
    }, function(data){
      vm.data = data;
      vm.loading = false;
    });

    $scope.$on('ui.request-remove', function(){
      if ( window.confirm('Tem certeza de deseja excluir \'' + vm.data.nome + '\'?') )
        vm.data.$delete(function(){
          $state.go('main.cursos.listar');
        });
    });

    $scope.$on('ui.request-edit', function(){
      $state.go('main.cursos.editar.info', {id: vm.data.id});
    });

  }
})();
