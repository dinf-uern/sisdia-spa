(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('EditarCursoController', EditarCursoController);

  /** @ngInject */
  function EditarCursoController($log, $state, $stateParams, dfNotify, Curso) {
    var vm = this;


    vm.tabs = [
      { label: 'Info', templateUrl: 'app/cursos/editar-curso-info.view.html', state: 'main.cursos.editar.info' },
      { label: 'Tags', templateUrl: 'client/turmas/turmas.listar.anteriores.html', state: 'main.cursos.editar.tags' }
    ];

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

    vm.onFormSubmit = function(){
      vm.data.$save(function(){
        $state.go('main.cursos.listar');
      });
    }

  }
})();
