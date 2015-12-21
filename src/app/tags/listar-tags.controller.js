(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarTagsController', ListarTagsController);

  /** @ngInject */
  function ListarTagsController($scope, $log, $state, $stateParams, dfNotify, Tag) {
    var vm = this;

    vm.tags = [];
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

    vm.verTag = function(tag){
      $state.go('main.tags.ver', {id: tag.id})
    }

    vm.loadData = function(filters){
      vm.loading = true;

      Tag.find({ filter: filters }, function(response){
        vm.loading = false;

        _.forEach(response, function(post){
          vm.tags.push(post);
        });

        if (vm.tags.length > 0)
          dfNotify.show('Exibindo ' + vm.tags.length + ' de ' + vm.count + ' itens');

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

    Tag.count({where: filters.where}, function(result){
      vm.count = result.count;
    });

    vm.loadData(filters);

    $scope.$on('scroll.reached-end', function(){
      vm.loadMore();
    });

  }
})();
