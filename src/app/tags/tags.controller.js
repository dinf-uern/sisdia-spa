(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TagsController', TagsController);

  /** @ngInject */
  function TagsController($scope, $state) {
    var vm = this;

    $scope.$on('ui.request-back', function(){
      $state.go('main.tags.listar');
    });
  }
})();
