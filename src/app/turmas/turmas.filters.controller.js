(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('TurmasFiltersController', TurmasFiltersController);

  /** @ngInject */
  function TurmasFiltersController($window, $scope, $rootScope, $state, $stateParams, Restangular, Utils, dfSidenav) {
    var ctrl = this;

    var Tags = Restangular.all('tags');
    var Cursos = Restangular.all('cursos');

    function getFilters(params){
      var curso = angular.fromJson(params.curso);
      var tags = angular.fromJson(params.tags);

      var filters = {
        q: $stateParams.q || "",
        curso: $stateParams.curso ? angular.fromJson($stateParams.curso) : {tags:[]} ,
        tags: $stateParams.tags ? angular.fromJson($stateParams.tags) : []
      };

      return filters;
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
        curso: angular.toJson(ctrl.filters.curso),
        tags: angular.toJson(ctrl.filters.tags)
      };

      $state.go('main.turmas.listar', filters);
      dfSidenav.hideAll();
    }

    ctrl.loadCursos = function(tags){
      var include = [
        {model:"tags", attributes:["id"], where: {
          id: {$in: _(tags).map(Utils.pick('id'))}
        }}
      ];

      return Cursos.getList({
        include: angular.toJson(include)
      }).then(function(response){
        ctrl.cursos = response.data.map(function(curso){ return curso.plain() });
      });
    }

    ctrl.limpar = function(){
      ctrl.filters.q = '';
      ctrl.filters.tags = [];
      ctrl.filters.curso = null;

      $state.go('main.turmas.listar', ctrl.filters);
      dfSidenav.hideAll();
    }

    $scope.$watch('ctrl.filters.tags', function(newTags){
      if (_.isObject(ctrl.filters.curso) && _.isArray(ctrl.filters.curso.tags)) {
        var newTagsIds = newTags.map(Utils.pick('id'));
        var cursoAtualTagsIds = ctrl.filters.curso.tags.map(Utils.pick('id'));

        var comumTags = _.intersection(newTagsIds, cursoAtualTagsIds);

        if (!(comumTags.length > 0))
          ctrl.filters.curso = null;

      }
    }, true);

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
      ctrl.filters = getFilters(toParams);
      ctrl.loadCursos(ctrl.filters.tags);
    });

    ctrl.cursos = [];
    ctrl.filters = getFilters($stateParams);
    ctrl.loadCursos(ctrl.filters.tags);

  }
})();
