import React, { Component } from 'react';
import './App.css';

class Column extends Component {
  render() {

    return (
      <div className="column">
      </div>

    );
  }
}

/*
<div class="column" ng-repeat="day in cal.days track by day"
ng-class="{ 'today' : day.isToday(), 'weekend' : day.isWeekend() }"
data-date={{day.format( 'L')}}
ng-click="addEvent($event)"
day-column="day"></div>
*/

export default Column;
