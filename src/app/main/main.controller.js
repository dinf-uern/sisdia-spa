(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $log, dfSidenav, dfNotify) {
    var vm = this;

    vm.getTitle = function(){
      return $state.current.data.title;
    }

    vm.getLeftSidenavPartialOnLarge = function(){
      return $state.current.data.leftSidenavPartialOnLarge;
    }

    vm.getLeftSidenavPartialOnSmall = function(){
      return $state.current.data.leftSidenavPartialOnSmall;
    }

    vm.getLeftSidenavFixedOnSmall = function(){
      return $state.current.data.leftSidenavFixedOnSmall;
    }

    vm.getLeftSidenavFixedOnLarge = function(){
      return $state.current.data.leftSidenavFixedOnLarge;
    }

    vm.getRightSidenavPartialOnLarge = function(){
      return $state.current.data.rightSidenavPartialOnLarge;
    }

    vm.getRightSidenavPartialOnSmall = function(){
      return $state.current.data.rightSidenavPartialOnSmall;
    }

    vm.getRightSidenavFixedOnSmall = function(){
      return $state.current.data.rightSidenavFixedOnSmall;
    }

    vm.getRightSidenavFixedOnLarge = function(){
      return $state.current.data.rightSidenavFixedOnLarge;
    }

    vm.getLeftButtons = function(){
      return $state.current.data.leftButtons;
    }

    vm.getRightButtons = function(){
      return $state.current.data.rightButtons;
    }

    vm.getFloatingButtons = function(){
      return $state.current.data.floatingButtons;
    }

    vm.scrollReachedEnd = function(){
      //$log.log('reached end');
      $scope.$broadcast('scroll.reached-end');
    }

    $scope.$on('left-sidenav.toggle', function(){
      dfSidenav.toggle('left');
    });

    $scope.$on('right-sidenav.toggle', function(){
      dfSidenav.toggle('right');
    });

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.data.roles && !dfAuth.hasRole(toState.data.roles)){
        dfNotify.show('Acesso negado!');
        event.preventDefault();
      }
    });

    $scope.$on('ui.show-notify', function(msg){
      dfNotify.show(msg);
    });

  }
})();
