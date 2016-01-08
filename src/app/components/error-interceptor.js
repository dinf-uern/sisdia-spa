(function() {
  'use strict';

  angular
    .module('sisdia')
    .factory('errorInterceptor', errorInterceptor);

  /** @ngInject */
  function errorInterceptor($q, $log, $rootScope) {
    return {
      'responseError': function(rejection) {
        $log.log(rejection);

        if (rejection && rejection.data && rejection.data.message)
          $rootScope.$broadcast('ui.show-notify', rejection.data.message);

        return $q.reject(rejection);
      }
    };
  };

})();
