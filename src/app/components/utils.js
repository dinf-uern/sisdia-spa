angular.module('df.utils', ['ui.router'])
  .factory('Utils', ['$state', '$q', function($state, $window, $q) {
    var utils = {};

    utils.convertObjectAttribute = function(obj, convertFunc){
      return function(propertyName){
        obj[propertyName] = convertFunc(obj[propertyName]);
      }
    }

    utils.toInteger = function(value){
      return parseInt(value);
    }

    utils.toDate = function(value){
      return new Date(value);
    }

    utils.confirm = function(msg){
      return $q(function(resolve, reject) {
        if ($window.confirm(msg))
          resolve()
        else
          reject();
      });
    }

    utils.goToState = function(stateName, params){
      return function(){
        $state.go(stateName, params);
      }
    }

    utils.prepareString = function(str, params){
      var novaStr = str;

      params.forEach(function(param, i){
        var numeroPosicao = i + 1;
        novaStr = novaStr.replace('%' + numeroPosicao, param);
      });

      return novaStr;
    }

    utils.pick = function(prop){
      return function(obj){
        return obj[prop];
      }
    }

    utils.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1)
        list.splice(idx, 1)
      else
        list.push(item);
    };

    utils.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    return utils;
  }]);
