(function() {
  'use strict';

  angular
    .module('sisdia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
