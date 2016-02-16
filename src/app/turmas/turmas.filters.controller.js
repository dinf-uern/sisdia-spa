(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TurmasFiltersController', TurmasFiltersController);

  /** @ngInject */
  function TurmasFiltersController($window, $state, $stateParams, Restangular, dfSidenav) {
    var ctrl = this;

    var Tags = Restangular.all('tags');
    var Cursos = Restangular.all('cursos');

    ctrl.cursos = [];

    ctrl.filters = {
      q: $stateParams.q ? $stateParams.q : '',
      tags: []
    };

    if ($stateParams.tags) {
      ctrl.filters.tags = Tags.getList({
        where: {
          id: {
            $in: angular.fromJson($stateParams.tags)
          }}
      }).$object;
    }

    function pickId(obj){
      return obj.id;
    }

    ctrl.toPlainTag = function($chip){
      return $chip.plain();
    }

    ctrl.queryTags = function(srch){
      return Tags.getList({
        where: { nome: {ilike: '%' + srch + '%'} },
        limit: 10
      }).$object;
    }

    ctrl.aplicar = function(){
      var filters = {
        q: ctrl.filters.q,
        curso: ctrl.filters.curso,
        tags: angular.toJson(_(ctrl.filters.tags).map(pickId))
      };

      $state.go('main.turmas.listar', filters);
      dfSidenav.hideAll();
    }

    ctrl.loadCursos = function(tags){
      var include = [
        {model:"tags", attributes:["id"], where: {
          id: {$in: _(tags).map(pickId)}
        }}
      ];

      ctrl.cursos = Cursos.getList({
        include: angular.toJson(include)
      }).$object;

      return ctrl.cursos;
    }

    ctrl.limpar = function(){
      ctrl.filters.q = '';
      ctrl.filters.tags = [];

      $state.go('main.turmas.listar', ctrl.filters);
      dfSidenav.hideAll();
    }

  }
})();
