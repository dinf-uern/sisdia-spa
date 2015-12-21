(function() {
  'use strict';

  angular
    .module('sisdia')
    .directive('formSala', formSala);

  /** @ngInject */
  function formSala() {
    var directive = {
      replace: true,
      restrict: 'E',
      scope: {
        onSubmit: '&',
        formData: '='
      },
      templateUrl: 'app/components/form-sala/form-sala.view.html',
      controller: formSalaController,
      controllerAs: 'ctrl',
      link: linkFunction
    };

    return directive;

    function linkFunction(scope, element, attrs, dfNotify) {
      var onSubmit = scope.onSubmit();

      var submitForm = scope.submitForm = function(){
        if (scope.form.$valid)
          onSubmit(scope.formData);
      }

      element.on('submit', submitForm);

      scope.$on('ui.request-submit', submitForm);
    }


    /** @ngInject */
    function formSalaController($log) {
      var vm = this;

      //vm.formData = {};
    }

  }

})();
