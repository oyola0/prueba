import React, { Component } from 'react';
import './App.css';

class Columns extends Component {
  constructor (props){
    super(props);
    this.handleUpdate=this.props.handleUpdate;
  }

  render() {
    var printColumns=[];
    var days=this.props.weeklyCalendar.flattenDays();

    var self=this;
    days.forEach((day,i) => {
      printColumns.push(
        <div data-date={day.format('YYYY-MM-DD')} onClick={self.handleUpdate.bind(this,day)} className={"column "+ (day.isToday() ? 'today ':'') +(day.isWeekend() ? 'weekend':'')} key={i}></div>
      )
    })
    return (
      <div className="columns">
        {printColumns}
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

export default Columns;
