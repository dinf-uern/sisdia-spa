(function() {
  'use strict';

  angular
    .module('sisdia')
    .directive('formTag', formTag);

  /** @ngInject */
  function formTag() {
    var directive = {
      replace: true,
      restrict: 'E',
      scope: {
        onSubmit: '&',
        formData: '='
      },
      templateUrl: 'app/components/form-tag/form-tag.view.html',
      controller: formTagController,
      controllerAs: 'ctrl',
      link: linkFunction
    };

    return directive;

    function linkFunction(scope, element, attrs, dfNotify) {
      var onSubmit = scope.onSubmit();

      var submitForm = function(){
        if (scope.form.$valid)
          onSubmit(scope.formData);
      }

      element.on('submit', submitForm);

      scope.$on('ui.request-submit', submitForm);
    }


    /** @ngInject */
    function formTagController($log) {
      var vm = this;
    }

  }

})();
