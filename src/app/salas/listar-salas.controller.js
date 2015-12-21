(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarSalasController', ListarSalasController);

  /** @ngInject */
  function ListarSalasController($scope, $log, $state, $stateParams, dfNotify, Sala) {
    var vm = this;

    vm.salas = [];
    vm.count = 1;

    vm.filters = angular.copy($stateParams);

    var page = 0;
    var limit = 5;

    function getFilters(){
      var filtersData = {
        limit: limit,
        skip: page * limit,
        where: {}
      };

      if ($stateParams.q)
        filtersData.where.nome = { like: '%' + $stateParams.q + '%' };

      return filtersData;
    }

    vm.loadData = function(filters, page){
      vm.loading = true;

      Sala.find({ filter: filters }, function(response){
        vm.loading = false;

        _.forEach(response, function(post){
          vm.salas.push(post);
        });

        if (vm.salas.length > 0)
          dfNotify.show('Exibindo ' + vm.salas.length + ' de ' + vm.count + ' itens');
      });
    }

    vm.loadMore = function(filters){
      if ((page + 1) * limit < vm.count) {
        page += 1;
        vm.loadData(filters, page);
      }
    }

    var filters = getFilters($stateParams.q);

    Sala.count({where: filters.where}, function(result){
      vm.count = result.count;
    });

    vm.loadData(filters, page);

    $scope.$on('scroll.reached-end', function(){
      vm.loadMore(filters);
    });

  }
})();
