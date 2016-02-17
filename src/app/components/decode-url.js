(function() {
  'use strict';

  angular.module('sisdia')
    .filter('decodeUrl', decodeUrlFilter);

    function decodeUrlFilter($window) {
      return function(input) {
        return $window.decodeURIComponent(input);
      };
    };
})();


