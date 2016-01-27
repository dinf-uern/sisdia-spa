(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('SalasController', SalasController);

  /** @ngInject */
  function SalasController($scope, $state) {
    var vm = this;

    $scope.$on('ui.request-back', function(){
      $state.go('main.salas.listar');
    });
  }
})();
