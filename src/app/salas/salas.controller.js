(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('SalasController', SalasController);

  /** @ngInject */
  function SalasController() {
    var vm = this;
    vm.salas = ['some', 'other'];
  }
})();
