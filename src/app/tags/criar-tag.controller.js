(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('CriarTagController', CriarTagController);

  /** @ngInject */
  function CriarTagController($log, Restangular, $state, dfNotify, Tag) {
    var vm = this;

    vm.onFormSubmit = function(data){
      Tag.create(data, function(){
        $state.go('main.tags.listar');
      });
    }

  }
})();
