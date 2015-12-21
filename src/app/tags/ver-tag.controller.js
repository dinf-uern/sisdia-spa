(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('VerTagController', VerTagController);

  /** @ngInject */
  function VerTagController($log, $scope, $state, $stateParams, Restangular, dfNotify) {
    var Tags = Restangular.all('tags');

    var vm = this;
    vm.loading = true;

    Tags.get($stateParams.id).then(function(result){
      vm.data = result.data;
      vm.loading = false;
    });

    $scope.$on('ui.request-remove', function(){
      if ( window.confirm('Tem certeza de deseja excluir \'' + vm.data.nome + '\'?') )
        vm.data.remove().then(function(){
          $state.go('main.tags.listar');
        });
    });

    $scope.$on('ui.request-edit', function(){
      $state.go('main.tags.editar', {id: vm.data.id});
    });

  }
})();
