(function() {
  'use strict';

  angular
    .module('sisdia')
    .directive('formCurso', formCurso);

  /** @ngInject */
  function formCurso() {
    var directive = {
      replace: true,
      restrict: 'E',
      scope: {
        onSubmit: '&',
        formData: '='
      },
      templateUrl: 'app/components/form-curso/form-curso.view.html',
      controller: formCursoController,
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
    function formCursoController($log, Restangular) {
      var Tags = Restangular.all('tags');
      var vm = this;

      vm.queryTags = function(srch){
        return Tags.getList({
          where: { nome: {like: '%' + srch + '%'} },
          limit: 10
        }).$object;
      }

      vm.transformChip = function(chip){
        var result = {};

        if (chip.constructor === String)
          result = {nome: chip};

        if (chip.constructor === Object)
          result = _.pick(chip, 'nome');

        return result;
      }
    }

  }

})();
