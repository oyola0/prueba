//private
import moment from 'moment';

var moment_locale = require('moment/locale/es.js');
moment.locale('es', moment_locale);

moment.fn.inRange = function(from, to) {
  var fromRange = this.isSame(from, 'day') || this.isAfter(from, 'day');
  var toRange = this.isSame(to, 'day') || this.isBefore(to, 'day');
  return fromRange && toRange;
}

moment.fn.isToday = function(){
  return this.isSame(moment(), 'day');
}

moment.fn.isWeekend = function() {
  var day = this.isoWeekday();
  return day === 6 || day === 7;
}
import Week from './Week.js';
import _ from 'underscore';

function WeeklyCalendar(){
  this.today = moment();
  this.currentDay = this.today.clone();
  this.weeks = [];
  this.calendarSize = 51;
  var self=this;

  var updateCalendar = function(date) {
      var newWeeks = [];
      var firstDayOfMonth = moment().startOf('week');
      var startDate = date ? moment(date) : firstDayOfMonth;
      var startWeek;
      if (!date) {
          startWeek = new Week({
              day: firstDayOfMonth
          }).prev();
      } else {
          startWeek = new Week({
              day: moment(date)
          }).prev();
      }
      while (newWeeks.length !== self.calendarSize) {
          startWeek = startWeek.next();
          newWeeks.push(startWeek);
      }
      self.weeks=newWeeks;

  }
  updateCalendar();
}
WeeklyCalendar.prototype.getWeeks = function() {
    return this.weeks;
}
WeeklyCalendar.prototype.getToday = function() {
    return this.today;
}
WeeklyCalendar.prototype.getCurrent = function() {
    return this.currentDay;
}
WeeklyCalendar.prototype.setCurrent = function(date) {
    this.currentDay = date;
    this.updateCalendar(date);
}
WeeklyCalendar.prototype.getFirstDay = function() {
    return this.weeks[0].Monday();
}
WeeklyCalendar.prototype.getLastDay = function() {
    return this.weeks[this.weeks.length - 1].Sunday();
}

WeeklyCalendar.prototype.nextWeek = function() {
    var next = this.weeks[this.weeks.length - 1].next();
    this.weeks.shift();
    this.weeks.push(next);
};

WeeklyCalendar.prototype.prevWeek = function() {
    var prev = this.weeks[0].prev();

    this.weeks.pop();
    this.weeks.unshift(prev);
}

WeeklyCalendar.prototype.flattenDays = function() {
    var days = _.chain(this.weeks)
        .pluck('days')
        .flatten().value();
    return days;
}

module.exports=WeeklyCalendar;
