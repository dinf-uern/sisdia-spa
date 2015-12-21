(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('EditarCursoController', EditarCursoController);

  /** @ngInject */
  function EditarCursoController($log, $state, $stateParams, Restangular, dfNotify) {
    var Cursos = Restangular.all('cursos');
    var vm = this;
    vm.loading = true;

    Cursos.get($stateParams.id,
      {
        include: angular.toJson([
          { model : "tags" }
        ])
      }
    ).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    vm.onFormSubmit = function(){
      vm.data.save().then(function(){
        $state.go('main.cursos.listar');
      });
    }

  }
})();
