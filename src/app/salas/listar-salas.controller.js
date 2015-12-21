(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarSalasController', ListarSalasController);

  /** @ngInject */
  function ListarSalasController($scope, $log, $state, $stateParams, Restangular, dfNotify) {
    var Salas = Restangular.all('salas');

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

    vm.verItem = function(sala){
      $state.go('main.salas.ver', {id: sala.id})
    }

    vm.loadData = function(filters){
      vm.loading = true;

      Salas
        .getList(filters)
        .then(function(response){
          vm.loading = false;

          _.forEach(response.data, function(sala){
            vm.items.push(sala);
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


    Salas.get('count', {where: filters.where}).then(function(result){
      vm.count = result.data.count;
    });

    vm.loadData(filters);

    $scope.$on('scroll.reached-end', function(){
      vm.loadMore();
    });

  }
})();
