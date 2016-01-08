(function() {
  'use strict';

  angular
    .module('sisdia')
    .controller('ListarTurmasController', ListarTurmasController);

  /** @ngInject */
  function ListarTurmasController($scope, $log, $state, $stateParams, $mdBottomSheet, Restangular, uiCalendarConfig, dfNotify, Utils, turmas) {
    var vm = this;

    vm.$stateParams = $stateParams;

    var day;

    if ($stateParams.day || turmas.data.length > 0) {
      if ($stateParams.day) {
        day = moment($stateParams.day);
      } else {
        day = moment(turmas.data[0].periodoAulas.inicio);
      }
    }

    vm.turmasEventos = _.map(turmas.data, function(turma){
      return {
        id: turma.id,
        title: turma.nome,
        start: Utils.toDate(turma.horarioAulas.horaInicio),
        end: Utils.toDate(turma.horarioAulas.horaTermino),
        dow: turma.horarioAulas.dias,
        ranges: [{
          start: Utils.toDate(turma.periodoAulas.inicio),
          end: Utils.toDate(turma.periodoAulas.termino)
        }],
        model: turma
      }
    });

    vm.calendarTitle = function(){
      var result = 'Calendário';

      if ($stateParams.calendarMode === 'agendaDay') {
        result = day.format('LL');
      }

      if ($stateParams.calendarMode === 'agendaWeek') {
        result = day.format('[Semana] WW - MMMM[/]YYYY');
      }

      if ($stateParams.calendarMode === 'month') {
        result = day.format('MMMM[/]YYYY');
      }

      return result;
    }

    vm.calendarModes = [
      {title: 'Dia', name: 'agendaDay'},
      {title: 'Semana', name: 'agendaWeek'},
      {title: 'Mês', name: 'month'}
    ];

    vm.setCalendarMode = function(modeName){
      $state.go('main.turmas.listar', {calendarMode: modeName});
    }

    vm.openMenuCalendarMode = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    vm.move = function(direction){
      var date;
      var op = direction === 'forward' ? 'add' : 'subtract' ;

      if ($stateParams.calendarMode === 'agendaDay') {
        date = day[op](1, 'day');
      }

      if ($stateParams.calendarMode === 'agendaWeek') {
        date = day[op](1, 'week');
      }

      if ($stateParams.calendarMode === 'month') {
        date = day[op](1, 'month');
      }

      $state.go('main.turmas.listar', { day: date.format().split('T')[0] });
    }

    vm.avancar = function(){
      vm.move('forward');
    };

    vm.voltar = function(){
      vm.move('backward');
    };

    vm.hoje = function(){
      $state.go('main.turmas.listar', {day: moment().format().split('T')[0]});
    };

    vm.clickedOnDay = function(date, $event, view) {
      $mdBottomSheet.show({
        templateUrl: 'app/turmas/calendar-context-menu.html',
        locals: {
          date: date
        },
        controller: function($scope, $mdBottomSheet, date){
          var vm = this;
          vm.requestCriarTurma = function(){
            $state.go('main.turmas.criar', {date: date.format()});
            $mdBottomSheet.hide();
          }
        },
        controllerAs: 'ctrl',
        targetEvent: $event
      });
    }

    vm.clickedOnTurma = function( turmaEvento, jsEvent, view ){
      $state.go('main.turmas.ver', turmaEvento);
    };

    /* Render Tooltip */
    vm.eventRender = function( event, element, view ) {

      var iconsContainer = $('<div class="event-icons-container"></div>');
      iconsContainer.append(_.map(event.model.curso.tags, function(tag){
        return '<img class="event-icon" src="' + tag.imgUrl + '">';
      }));

      element.find('.fc-title').append(iconsContainer);
      element.css('background-color', event.model.cor);
      element.css('border-color', event.model.cor);

      //element.append("<img class='event-icon' src='http://icongal.com/gallery/image/179290/guitar_music_electric_guitar_drum.png'>");
      return (event.ranges.filter(function(range){ // test event against all the ranges

          return (event.start.isBefore(range.end) &&
          event.end.isAfter(range.start));

        }).length) > 0;
    };

    /* event sources array*/
    vm.eventSources = [vm.turmasEventos];

    vm.calendarConfig = {
      firstDay: 1,
      /*minTime: '07:00:00',
      maxTime: '22:00:00',
      hiddenDays: [6, 0],*/
      businessHours: {
        start: '07:00',
        end: '22:00',
        dow: [ 1, 2, 3, 4, 5 ]
      },
      lang: 'pt-BR',
      height: "auto",
      defaultDate: day,
      defaultView: $stateParams.calendarMode || 'agendaWeek',
      editable: true,
      header:{
        left: '',
        center: '',
        right: ''
      },
      eventClick: vm.clickedOnTurma,
      dayClick: vm.clickedOnDay,
      eventRender: vm.eventRender,
      viewRender: vm.viewRender
    }

  }
})();
