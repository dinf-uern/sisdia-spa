(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CursosController', CursosController);

  /** @ngInject */
  function CursosController($scope, $state) {
    var vm = this;

    $scope.$on('ui.request-back', function(){
      $state.go('main.cursos.listar');
    });
  }
})();
