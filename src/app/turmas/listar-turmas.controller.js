(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarTurmasController', ListarTurmasController);

  /** @ngInject */
  function ListarTurmasController($scope, $log, $state, $stateParams, Restangular, dfNotify) {
    var Turmas = Restangular.all('turmas');

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

    vm.verItem = function(turma){
      $state.go('main.turmas.ver', {id: turma.id})
    }

    vm.loadData = function(filters){
      vm.loading = true;

      Turmas
        .getList(filters)
        .then(function(response){
          vm.loading = false;

          _.forEach(response.data, function(turma){
            vm.items.push(turma);
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


    Turmas.get('count', {where: filters.where}).then(function(result){
      vm.count = result.data.count;
    });

    vm.loadData(filters);

    $scope.$on('scroll.reached-end', function(){
      vm.loadMore();
    });

  }
})();
