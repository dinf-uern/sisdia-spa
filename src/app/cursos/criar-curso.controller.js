(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarCursoController', CriarCursoController);

  /** @ngInject */
  function CriarCursoController($log, $state, dfNotify, Curso) {
    var vm = this;

    vm.data = {
      tags: []
    };

    vm.onFormSubmit = function(data){
      Curso.create(vm.data, function(){
        //$state.go('main.cursos.listar');
      });
    }

  }
})();
