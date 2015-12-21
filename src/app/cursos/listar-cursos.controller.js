(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarCursosController', ListarCursosController);

  /** @ngInject */
  function ListarCursosController($scope, $log, $state, $stateParams, dfNotify, Curso) {
    var vm = this;

    vm.cursos = [];
    vm.count = 1;

    vm.filters = angular.copy($stateParams);

    var page = 0;
    var limit = 5;

    function getFilters(page, limit, q){
      var filtersData = {
        limit: limit,
        skip: page * limit,
        where: {}
      };

      if (q)
        filtersData.where.nome = { like: '%' + q + '%' };

      return filtersData;
    }

    vm.verCurso = function(curso){
      $state.go('main.cursos.ver', {id: curso.id})
    }

    vm.loadData = function(filters){
      vm.loading = true;

      Curso.find({ filter: filters }, function(response){
        vm.loading = false;

        _.forEach(response, function(post){
          vm.cursos.push(post);
        });

        if (vm.cursos.length > 0)
          dfNotify.show('Exibindo ' + vm.cursos.length + ' de ' + vm.count + ' itens');

      });
    }

    vm.loadMore = function(){
      if ((page + 1) * limit < vm.count) {
        page += 1;

        var filters = getFilters(page, limit, $stateParams.q);

        vm.loadData(filters);
      }
    }

    var filters = getFilters(page, limit, $stateParams.q);

    Curso.count({where: filters.where}, function(result){
      vm.count = result.count;
    });

    vm.loadData(filters);

    $scope.$on('scroll.reached-end', function(){
      vm.loadMore();
    });

  }
})();
