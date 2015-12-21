(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarCursoController', CriarCursoController);

  /** @ngInject */
  function CriarCursoController($log, $state, Restangular, dfNotify) {
    var Cursos = Restangular.all('cursos');
    var vm = this;
    vm.data = {
      tags: []
    };

    vm.onFormSubmit = function(data){
      Cursos.post(data).then(function(){
        $state.go('main.cursos.listar');
      });
    }

  }
})();
