(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TurmasFiltersController', TurmasFiltersController);

  /** @ngInject */
  function TurmasFiltersController($window, $state, $stateParams, Restangular, dfSidenav) {
    var vm = this;

    var Tags = Restangular.all('tags');
    var Cursos = Restangular.all('cursos');
    vm.filters = {
      q: $stateParams.q ? $stateParams.q : '',
      tags: []
    };

    if ($stateParams.tags) {
      vm.filters.tags = Tags.getList({
        where: {
          id: {
            $in: angular.fromJson($stateParams.tags)
          }}
      }).$object;
    }

    function pickId(obj){
      return obj.id;
    }

    vm.toPlainTag = function($chip){
      return $chip.plain();
    }

    vm.queryTags = function(srch){
      return Tags.getList({
        where: { nome: {ilike: '%' + srch + '%'} },
        limit: 10
      }).$object;
    }

    vm.aplicar = function(){
      var filters = {
        q: vm.filters.q,
        tags: angular.toJson(_(vm.filters.tags).map(pickId))
      };

      $state.go('main.turmas.listar', filters);
      dfSidenav.hideAll();
    }

    vm.loadCursos = function(tags){
      var include = [
        {model:"tags", attributes:["id"], where: {
          id: {$in: _(tags).map(pickId)}
        }}
      ];

      vm.cursos = Cursos.getList({
        include: angular.toJson(include)
      }).$object;

      return vm.cursos;
    }

    vm.limpar = function(){
      vm.filters.q = '';
      vm.filters.tags = [];

      $state.go('main.turmas.listar', vm.filters);
      dfSidenav.hideAll();
    }

  }
})();
