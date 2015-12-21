(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarCursosController', ListarCursosController);

  /** @ngInject */
  function ListarCursosController($scope, $log, $state, $stateParams, Restangular, dfNotify) {
    var Cursos = Restangular.all('cursos');

    var vm = this;

    vm.items = [];
    vm.count = 0;

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

    vm.verItem = function(curso){
      $state.go('main.cursos.ver', {id: curso.id})
    }

    vm.loadData = function(filters){
      vm.loading = true;

      Cursos
        .getList(filters)
        .then(function(response){
          vm.loading = false;

          _.forEach(response.data, function(curso){
            vm.items.push(curso);
          });

          if (vm.items.length > 0)
            dfNotify.show('Exibindo ' + vm.items.length + ' de ' + vm.count + ' itens');
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


    Cursos.get('count', {where: filters.where}).then(function(result){
      vm.count = result.data.count;
    });

    vm.loadData(filters);

    $scope.$on('scroll.reached-end', function(){
      vm.loadMore();
    });

  }
})();
