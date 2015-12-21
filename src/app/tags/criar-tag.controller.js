(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarTagController', CriarTagController);

  /** @ngInject */
  function CriarTagController($log, $state, Restangular, dfNotify) {
    var Tags = Restangular.all('tags');
    var vm = this;

    vm.onFormSubmit = function(data){
      Tags.post(data).then(function(){
        $state.go('main.tags.listar');
      });
    }

  }
})();
