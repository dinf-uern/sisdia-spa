(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('VerTagController', VerTagController);

  /** @ngInject */
  function VerTagController($log, $scope, $state, $stateParams, dfNotify, Tag) {
    var vm = this;
    vm.loading = true;

    Tag.findById({id: $stateParams.id}, function(data){
      vm.data = data;
      vm.loading = false;
    });

    $scope.$on('ui.request-remove', function(){
      if ( window.confirm('Tem certeza de deseja excluir \'' + vm.data.nome + '\'?') )
        vm.data.$delete(function(){
          $state.go('main.tags.listar');
        });
    });

    $scope.$on('ui.request-edit', function(){
      $state.go('main.tags.editar', {id: vm.data.id});
    });

  }
})();
