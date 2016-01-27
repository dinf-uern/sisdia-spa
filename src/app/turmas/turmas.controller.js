(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TurmasController', TurmasController);

  /** @ngInject */
  function TurmasController($scope, $state) {
    var vm = this;

    $scope.$on('ui.request-back', function(){
      $state.go('main.turmas.listar');
    });
  }
})();
