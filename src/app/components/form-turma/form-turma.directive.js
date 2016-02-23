(function() {
  'use strict';

  angular
    .module('sisdia')
    .directive('formTurma', formTurma);

  /** @ngInject */
  function formTurma() {
    var directive = {
      replace: true,
      restrict: 'E',
      scope: {
        onSubmit: '&',
        formData: '=',
        inicioAulas: '='
      },
      templateUrl: 'app/components/form-turma/form-turma.view.html',
      controller: formTurmaController,
      controllerAs: 'ctrl',
      link: linkFunction
    };

    return directive;

    function linkFunction(scope, element, attrs, dfNotify, Utils) {
      var onSubmit = scope.onSubmit();

      var submitForm = function(){
        if (scope.form.$valid)
          onSubmit(scope.formData);
      }

      element.on('submit', submitForm);
      scope.$on('ui.request-submit', submitForm);
    }


    /** @ngInject */
    function formTurmaController($log, $scope, Restangular, Utils, colorGen) {
      var Cursos = Restangular.all('cursos');
      var Salas = Restangular.all('salas');
      var primeiroDia = moment([1970]);

      var vm = this;
      vm.cursos = [];
      vm.salas = [];

      vm.loadCursos = function(){
        vm.cursos = Cursos.getList().$object;
      }

      vm.loadSalas = function(){
        vm.salas = Salas.getList().$object;
      }

      vm.gerarCor = function(e){
        e.preventDefault();

        $scope.formData.cor = colorGen.make_color({
          hue: 0,
          saturation: .5,
          value: 0.65
        })[0];
      }

      vm.salaSrchTerm = "";
      vm.nomeTurmaMode = 'templateBased';

      vm.nomeTurmaTemplates = [
        'Turma {{id}}',
        'Turma {{id}} ({{turno}})'
      ];

      vm.diasLetivos = [
        {id: 1, nome: 'Segunda' },
        {id: 2, nome: 'Terça' },
        {id: 3, nome: 'Quarta' },
        {id: 4, nome: 'Quinta' },
        {id: 5, nome: 'Sexta' },
        {id: 6, nome: 'Sábado' },
        {id: 7, nome: 'Domingo' }
      ];

      vm.diaToggle = function (dia, list) {
        var i = list.indexOf(dia.id);
        if (i > -1) list.splice(i, 1);
        else list.push(dia.id);
      };

      vm.diaExists = function (dia, list) {
        return list && list.indexOf(dia.id) > -1;
      };

      vm.enterNomeTurmaMode = function(e, mode){
        e.preventDefault();
        vm.nomeTurmaMode = mode;
      }

      $scope.$watch('inicioAulas', function(value){
        if (value) {
          $scope.formData.periodoAulas.inicio = moment(value).toDate();
          $scope.formData.horarioAulas.dias = [moment(value).day()];

         var partesTempo = value.split('T')[1] ? value.split('T')[1].split(':').map(function(value){return parseInt(value)}) : [] ;

          var horaInicio = primeiroDia
            .clone()
            .add(partesTempo[0], 'hour')
            .add(partesTempo[1], 'minute')
            .add(partesTempo[2], 'second');

          $scope.formData.horarioAulas.horaInicio = horaInicio.toDate();
        }
      });

      $scope.$watch('formData', function(formData){

        if (formData && formData.periodoAulas && formData.periodoAulas.inicio)
          formData.periodoAulas.inicio = moment(formData.periodoAulas.inicio).toDate();

        if (formData && formData.periodoAulas && formData.periodoAulas.termino)
          formData.periodoAulas.termino = moment(formData.periodoAulas.termino).toDate();

        if (formData && formData.periodoInscricoes && formData.periodoInscricoes.inicio)
          formData.periodoInscricoes.inicio = moment(formData.periodoInscricoes.inicio).toDate();

        if (formData && formData.periodoInscricoes && formData.periodoInscricoes.termino)
          formData.periodoInscricoes.termino = moment(formData.periodoInscricoes.termino).toDate();

        if (formData && formData.horarioAulas && formData.horarioAulas.horaInicio)
          formData.horarioAulas.horaInicio = moment(formData.horarioAulas.horaInicio).toDate();

        if (formData && formData.horarioAulas && formData.horarioAulas.horaTermino)
          formData.horarioAulas.horaTermino = moment(formData.horarioAulas.horaTermino).toDate();

      });

      vm.loadCursos();
      vm.loadSalas();

    }

  }

})();
